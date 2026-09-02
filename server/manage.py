#!/usr/bin/env python
import os
import sys

def main():
    # Insert server directory into sys.path so 'borqan_backend' and 'api' resolve correctly from any cwd
    server_dir = os.path.dirname(os.path.abspath(__file__))
    if server_dir not in sys.path:
        sys.path.insert(0, server_dir)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'borqan_backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
