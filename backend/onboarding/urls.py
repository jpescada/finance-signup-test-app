from django.urls import path
from .views import SignUpView, LoginView, LogoutView, ApplicationStatusView, DocumentUploadView, CSRFView, AdminApplicationView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('status/', ApplicationStatusView.as_view(), name='status'),
    path('upload/', DocumentUploadView.as_view(), name='upload'),
    path('csrf/', CSRFView.as_view(), name='csrf'),
    
    path('admin/applications/', AdminApplicationView.as_view(), name='admin_applications'),
    path('admin/applications/<int:application_id>/', AdminApplicationView.as_view(), name='admin_application_action'),
]