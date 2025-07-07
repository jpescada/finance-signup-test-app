from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import Application, Document, DocumentType
from .serializers import ApplicationSerializer, DocumentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser, FormParser


def validate_and_get_file(file):
    # Basic file validation
    if file.size > 5 * 1024 * 1024:
        return None, 'File size exceeds 5MB'
    if file.content_type not in ['application/pdf', 'image/jpeg', 'image/png']:
        return None, 'Invalid file type'
    return file, None

class SignUpView(APIView):
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        name = request.data.get('name')
        password = request.data.get('password')
        document_type = request.data.get('document_type')
        file = request.FILES.get('certificate')

        file, error = validate_and_get_file(file)
        if error:
            return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=name, password=password)
            application = Application.objects.create(user=user)
            doc_type = DocumentType.objects.get(name=document_type or 'Certificate of Incorporation')
            Document.objects.create(application=application, document_type=doc_type, file=file)
            return Response({'message': 'User registered and application created'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        name = request.data.get('name')
        password = request.data.get('password')
        user = authenticate(request, username=name, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class ApplicationStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        application = Application.objects.filter(user=request.user).first()
        if not application:
            return Response({'error': 'No application found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ApplicationSerializer(application)
        return Response(serializer.data)

class DocumentUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        application = Application.objects.filter(user=request.user, status='PUSHBACK').first()
        if not application:
            return Response({'error': 'No pushback application found'}, status=status.HTTP_400_BAD_REQUEST)

        document_type = request.data.get('document_type')
        file = request.FILES.get('certificate')
        file, error = validate_and_get_file(file)
        if error:
            return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)

        try:
            doc_type = DocumentType.objects.get(name=document_type or 'Certificate of Incorporation')
            document = Document.objects.create(application=application, document_type=doc_type, file=file)
            application.status = 'PENDING'
            application.save()
            serializer = DocumentSerializer(document)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminApplicationView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        applications = Application.objects.all()
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    def post(self, request, application_id):
        application = Application.objects.get(id=application_id)
        action = request.data.get('action')
        reason = request.data.get('reason', '')

        if action == 'APPROVE':
            application.status = 'APPROVED'
        elif action == 'REJECT':
            application.status = 'REJECTED'
            latest_document = application.documents.last()
            latest_document.reason = reason if reason else 'Application rejected'
            latest_document.save()
        elif action == 'PUSHBACK':
            application.status = 'PUSHBACK'
            latest_document = application.documents.last()
            latest_document.reason = reason if reason else 'Please re-upload a valid document.'
            latest_document.save()
        else:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        application.save()
        return Response({'message': f'Application {action.lower()}ed'}, status=status.HTTP_200_OK)
    
class CSRFView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        return Response({'message': 'CSRF token is valid'}, status=status.HTTP_200_OK)
