# 🚀 Full Stack Setup & Frontend-to-Backend Connection Guide (Borqan)

This document provides a step-by-step walkthrough on how to run the complete **Borqan** stack locally and the industry best practices for integrating the **React Frontend** with the **Django REST API + PostgreSQL Backend**.

---

## 💻 Part 1: How to Run the Full Application Locally

### 1. Run the Django Backend (Terminal 1)
Make sure you are in the project root directory (`/home/elsayed/Documents/borqan`):

```bash
# 1. Activate the Python virtual environment (created via uv)
source .venv/bin/activate

# 2. Run database migrations (SQLite locally / PostgreSQL in prod)
python server/manage.py migrate

# 3. Start the Django API & Password-Protected Admin Server
python server/manage.py runserver 8000
```
- 🟢 **Django REST API:** `http://localhost:8000/api/`
- 🛡️ **Django Admin Panel:** `http://localhost:8000/admin/` (Login: `admin` / `admin1234`)

---

### 2. Run the React Frontend (Terminal 2)
In a second terminal window:

```bash
# 1. Install Node.js dependencies (if not already installed)
npm install

# 2. Start the Vite React development server
npm run dev
```
- 🌐 **Student Landing Page:** `http://localhost:3001/`
- 📱 **Student Web App:** `http://localhost:3001/#/app`
- 👨‍🏫 **Tutor Portal:** `http://localhost:3001/#/tutors`

---

## 🛠️ Part 2: Best Practices for Connecting React Frontend to Django API

### 1. Environment Variable Architecture (`.env`)
Never hardcode API URLs in frontend components. Use Vite environment variables:

- Create `.env.development` in project root:
  ```env
  VITE_API_BASE_URL=http://localhost:8000/api
  VITE_TELEGRAM_BOT=burqan5_bot
  ```

- Create `.env.production` for production build:
  ```env
  VITE_API_BASE_URL=https://api.borqan.com/api
  VITE_TELEGRAM_BOT=burqan5_bot
  ```

---

### 2. Centralized API Client Module (`src/services/api.js`)
Create a dedicated API wrapper using `fetch` or `axios` to handle base URLs, headers, and authentication tokens in one place.

```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiService {
  static getAuthToken() {
    return localStorage.getItem('borqan_access_token');
  }

  static async request(endpoint, options = {}) {
    const token = this.getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (response.status === 401) {
        // Token expired - redirect to login or refresh token
        localStorage.removeItem('borqan_access_token');
        window.location.hash = '#/app';
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP Error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // --- API Endpoints ---

  // 1. Telegram Authentication
  static async loginWithTelegram(telegramData) {
    return this.request('/auth/telegram/', {
      method: 'POST',
      body: JSON.stringify(telegramData),
    });
  }

  // 2. Fetch Live Tutors List
  static async getTutors() {
    return this.request('/tutors/');
  }

  // 3. Submit Vodafone Cash / InstaPay Receipt
  static async submitVodafonePayment(paymentData) {
    return this.request('/payments/vodafone/', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // 4. Request LiveKit WebRTC Call Room Token
  static async getLiveKitCallToken(roomName, tutorId) {
    return this.request('/livekit/token/', {
      method: 'POST',
      body: JSON.stringify({ roomName, tutorId }),
    });
  }
}

export default ApiService;
```

---

### 3. Using API Client Inside React Components

Example: Fetching live tutors inside `StudentApp.jsx`:

```javascript
import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

export default function StudentApp() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTutors() {
      try {
        const data = await ApiService.getTutors();
        setTutors(data);
      } catch (err) {
        console.error('Failed to load tutors:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTutors();
  }, []);

  // Render UI...
}
```

---

### 4. Handling CORS in Django (`settings.py`)
In Django backend (`server/borqan_backend/settings.py`), ensure `django-cors-headers` is configured so browsers allow cross-origin API calls:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Must be at the top
    ...
]

# Allow React Frontend origins:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://elsayied.github.io",
]
```

---

## 🐳 Part 3: Production Deployment on Oracle Cloud VPS

Deploy Django, PostgreSQL, and LiveKit WebRTC in 1 command using Docker Compose:

```bash
# On your Oracle Cloud VPS:
git clone https://github.com/elsayied/borqan.git
cd borqan/server

# Start all services (Django + PostgreSQL + LiveKit) in background
docker compose up -d --build
```
