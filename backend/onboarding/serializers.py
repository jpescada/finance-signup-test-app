from rest_framework import serializers
from .models import Application, Document, DocumentType
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class DocumentSerializer(serializers.ModelSerializer):
    document_type = serializers.SlugRelatedField(slug_field='name', queryset=DocumentType.objects.all())
    file = serializers.FileField()

    class Meta:
        model = Document
        fields = ['id', 'document_type', 'file', 'uploaded_at', 'reason']

class ApplicationSerializer(serializers.ModelSerializer):
    documents = DocumentSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'user', 'status', 'created_at', 'updated_at', 'documents']