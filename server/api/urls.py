from django.urls import path
from .views import AdminLoginView, TelegramLoginView, TutorListView, TutorApplicationView, VodafonePaymentView, FawryWebhookView

urlpatterns = [
    path('auth/admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('auth/telegram/', TelegramLoginView.as_view(), name='telegram-login'),
    path('tutors/', TutorListView.as_view(), name='tutors-list'),
    path('tutors/apply/', TutorApplicationView.as_view(), name='tutor-apply'),
    path('payments/vodafone/', VodafonePaymentView.as_view(), name='vodafone-payment'),
    path('payments/fawry/webhook/', FawryWebhookView.as_view(), name='fawry-webhook'),
]
