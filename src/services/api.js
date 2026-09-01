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

  static async loginWithTelegram(telegramData) {
    return this.request('/auth/telegram/', {
      method: 'POST',
      body: JSON.stringify(telegramData),
    });
  }

  static async getTutors() {
    return this.request('/tutors/');
  }

  static async submitTutorApplication(applicationData) {
    return this.request('/tutors/apply/', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  static async submitVodafonePayment(paymentData) {
    return this.request('/payments/vodafone/', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  static async triggerFawryWebhook(studentId) {
    return this.request('/payments/fawry/webhook/', {
      method: 'POST',
      body: JSON.stringify({ student_id: studentId }),
    });
  }
}

export default ApiService;
