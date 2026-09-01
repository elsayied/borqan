from django.contrib import admin
from django.utils.html import format_html
from .models import SubscriptionPlan, StudentProfile, Teacher, TeacherApplication, VodafonePaymentRequest, CallSession

@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price_egp', 'sessions_count', 'is_active')
    list_filter = ('is_active',)

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'telegram_id', 'subscription_status', 'sessions_left')
    list_filter = ('subscription_status',)
    search_fields = ('user__username', 'user__first_name', 'phone', 'telegram_id')

@admin.register(VodafonePaymentRequest)
class VodafonePaymentRequestAdmin(admin.ModelAdmin):
    list_display = ('student', 'sender_phone', 'plan', 'transaction_ref', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'created_at')
    search_fields = ('sender_phone', 'transaction_ref', 'student__user__username')
    actions = ['approve_payments']

    @admin.action(description='تفعيل اشتراك فودافون كاش للطالب المحول فوراً ⚡')
    def approve_payments(self, request, queryset):
        for req in queryset.filter(is_approved=False):
            req.is_approved = True
            req.save()
            # Update student profile
            profile = req.student
            profile.subscription_status = 'active'
            profile.active_plan = req.plan
            profile.sessions_left += req.plan.sessions_count
            profile.save()
        self.message_user(request, "تم تفعيل اشتراكات الطلاب المحددين وإفادتهم بالجلسات بنجاح!")

@admin.register(TeacherApplication)
class TeacherApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'experience_years', 'status', 'created_at')
    list_filter = ('status', 'gender')
    search_fields = ('name', 'phone', 'ijazah_details')
    actions = ['approve_teacher_applications']

    @admin.action(description='قبول وإضافة المعلمين المتقدمين لقائمة التدريب المباشر 🎉')
    def approve_teacher_applications(self, request, queryset):
        for app in queryset.filter(status='pending'):
            app.status = 'approved'
            app.save()
            # Automatically create Teacher object
            Teacher.objects.create(
                name=app.name,
                specialty="حفظ وتجويد القرآن الكريم",
                ijazah=app.ijazah_details,
                gender=app.gender,
                status='online'
            )
        self.message_user(request, "تمت الموافقة على طلبات المعلمين وإضافتهم لدليل المعلمين المباشرين بنجاح!")

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'specialty', 'gender', 'status', 'rating', 'students_count')
    list_filter = ('status', 'gender')
    search_fields = ('name', 'specialty', 'ijazah')

@admin.register(CallSession)
class CallSessionAdmin(admin.ModelAdmin):
    list_display = ('room_name', 'student', 'teacher', 'is_recorded', 'started_at')
    list_filter = ('is_recorded',)
