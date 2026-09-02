import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import SubscriptionPlan, StudentProfile, Teacher, TeacherApplication, VodafonePaymentRequest, CallSession

class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None and (user.is_staff or user.is_superuser):
            return Response({
                'message': 'Admin authenticated successfully',
                'admin_token': f'admin_session_{user.id}_secret_token',
                'user': {
                    'username': user.username,
                    'is_superuser': user.is_superuser
                }
            })
        
        return Response(
            {'error': 'بيانات الدخول غير صحيحة أو ليس لديك صلاحيات أدمن الإدارة.'},
            status=status.HTTP_401_UNAUTHORIZED
        )

class TelegramLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        telegram_id = request.data.get('telegram_id')
        name = request.data.get('name', 'طالب جديد')
        phone = request.data.get('phone', '')

        if not telegram_id:
            return Response({'error': 'telegram_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Get or create user
        username = f"tg_{telegram_id}"
        user, created = User.objects.get_or_create(username=username, defaults={'first_name': name})

        # Get or create profile
        profile, p_created = StudentProfile.objects.get_or_create(
            user=user,
            defaults={'telegram_id': telegram_id, 'phone': phone}
        )

        return Response({
            'message': 'Logged in successfully',
            'user': {
                'id': user.id,
                'name': user.first_name or user.username,
                'phone': profile.phone,
                'subscription_status': profile.subscription_status,
                'sessions_left': profile.sessions_left
            }
        })

class TutorListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        tutors = Teacher.objects.all()
        data = [{
            'id': t.id,
            'name': t.name,
            'title': t.title,
            'specialty': t.specialty,
            'ijazah': t.ijazah,
            'status': t.status,
            'rating': float(t.rating),
            'studentsCount': t.students_count,
            'avatar': t.avatar.url if t.avatar else 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
        } for t in tutors]
        return Response(data)

class TutorApplicationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        name = request.data.get('name')
        phone = request.data.get('phone')
        experience_years = request.data.get('experienceYears', 0)
        ijazah_details = request.data.get('ijazahDetails', '')

        app = TeacherApplication.objects.create(
            name=name,
            phone=phone,
            experience_years=experience_years,
            ijazah_details=ijazah_details
        )
        return Response({'message': 'Application submitted successfully', 'id': app.id})

class VodafonePaymentView(APIView):
    def post(self, request):
        sender_phone = request.data.get('sender_phone')
        transaction_ref = request.data.get('transaction_ref')

        profile = request.user.student_profile
        plan = SubscriptionPlan.objects.filter(is_active=True).first()

        payment_req = VodafonePaymentRequest.objects.create(
            student=profile,
            plan=plan,
            sender_phone=sender_phone,
            transaction_ref=transaction_ref
        )

        profile.subscription_status = 'pending'
        profile.save()

        return Response({'message': 'Payment receipt submitted. Pending admin verification.'})

class FawryWebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Instant Fawry Automatic Activation Webhook
        merchant_ref_num = request.data.get('merchantRefNum')
        student_id = request.data.get('student_id')

        try:
            profile = StudentProfile.objects.get(id=student_id)
            plan = SubscriptionPlan.objects.first()
            profile.subscription_status = 'active'
            profile.active_plan = plan
            profile.sessions_left += (plan.sessions_count if plan else 8)
            profile.save()
            return Response({'status': 'SUCCESS', 'message': 'Instant activation complete'})
        except StudentProfile.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
