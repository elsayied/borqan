from django.db import models
from django.contrib.auth.models import User

class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=100, verbose_name="اسم الباقة")
    price_egp = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="السعر بالجنيه")
    sessions_count = models.IntegerField(default=8, verbose_name="عدد الجلسات")
    is_active = models.BooleanField(default=True, verbose_name="مفعلة")

    def __str__(self):
        return f"{self.name} - {self.price_egp} EGP"

class StudentProfile(models.Model):
    STATUS_CHOICES = [
        ('unsubscribed', 'غير مشترك'),
        ('pending', 'قيد تأكيد فودافون كاش'),
        ('active', 'اشتراك نشط'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    telegram_id = models.CharField(max_length=100, blank=True, verbose_name="معرف التليجرام")
    phone = models.CharField(max_length=20, verbose_name="رقم الجوال")
    subscription_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unsubscribed', verbose_name="حالة الاشتراك")
    active_plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="الباقة الحالية")
    sessions_left = models.IntegerField(default=0, verbose_name="الجلسات المتبقية")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} ({self.phone})"

class Teacher(models.Model):
    GENDER_CHOICES = [('male', 'معلم (رجل)'), ('female', 'معلمة (امرأة)')]
    STATUS_CHOICES = [('online', 'متاح الآن 🟢'), ('busy', 'في جلسة 🔴'), ('offline', 'غير متاح ⚪')]

    name = models.CharField(max_length=150, verbose_name="اسم الشيخ / المعلم")
    title = models.CharField(max_length=150, default="مقرئ معتمد بالقراءات", verbose_name="المسمى العلمي")
    specialty = models.CharField(max_length=200, verbose_name="التخصص القرآني")
    ijazah = models.TextField(verbose_name="الإجازات والأسانيد")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male', verbose_name="الجنس")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='online', verbose_name="الحالة الحالية")
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5.0, verbose_name="التقييم")
    students_count = models.IntegerField(default=0, verbose_name="عدد الطلاب")
    avatar = models.ImageField(upload_to='teachers_avatars/', blank=True, null=True, verbose_name="الصورة الشخصية")

    def __str__(self):
        return f"{self.name} - {self.specialty}"

class TeacherApplication(models.Model):
    STATUS_CHOICES = [('pending', 'قيد الدراسة والمراجعة'), ('approved', 'مقبول ومفعل'), ('rejected', 'مرفوض')]

    name = models.CharField(max_length=150, verbose_name="اسم المتقدم")
    phone = models.CharField(max_length=20, verbose_name="رقم الجوال / الواتساب")
    gender = models.CharField(max_length=10, default='male', verbose_name="الجنس")
    experience_years = models.IntegerField(default=0, verbose_name="سنوات الخبرة")
    ijazah_details = models.TextField(verbose_name="تفاصيل الإجازة والسند")
    recitation_link = models.URLField(blank=True, verbose_name="رابط عينة التلاوة")
    cert_file = models.FileField(upload_to='certificates/', blank=True, null=True, verbose_name="وثيقة الإجازة/الشهادة")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="حالة الطلب")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"طلب انضمام: {self.name} ({self.status})"

class VodafonePaymentRequest(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='payment_requests')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE, verbose_name="الباقة المطلوبة")
    sender_phone = models.CharField(max_length=20, verbose_name="رقم محفظة التحويل")
    transaction_ref = models.CharField(max_length=100, verbose_name="رقم مرجع العملية")
    receipt_image = models.ImageField(upload_to='receipts/', blank=True, null=True, verbose_name="صورة الوصل")
    is_approved = models.BooleanField(default=False, verbose_name="تم الاعتماد والموافقة")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"تحويل فودافون: {self.student} - {self.transaction_ref}"

class CallSession(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    room_name = models.CharField(max_length=100, unique=True)
    is_recorded = models.BooleanField(default=False)
    recording_url = models.URLField(blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"جلسة {self.room_name} ({self.student} ➔ {self.teacher})"
