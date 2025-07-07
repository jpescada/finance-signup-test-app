from django.contrib import admin
from .models import Application, Document, DocumentType

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['user', 'status', 'created_at', 'updated_at']
    list_filter = ['status']
    actions = ['approve', 'reject', 'pushback']

    def approve(self, request, queryset):
        queryset.update(status='APPROVED')
    def reject(self, request, queryset):
        queryset.update(status='REJECTED')
    def pushback(self, request, queryset):
        for application in queryset:
            application.status = 'PUSHBACK'
            latest_document = application.documents.last()
            latest_document.reason = request.POST.get('reason', 'Please re-upload a valid document.')
            latest_document.save()
            application.save()

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['application', 'document_type', 'uploaded_at']

@admin.register(DocumentType)
class DocumentTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']