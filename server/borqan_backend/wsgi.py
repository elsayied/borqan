import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'borqan_backend.settings')

application = get_wsgi_application()
wsgi = application
