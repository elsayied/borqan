import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// For Android emulator/device on local network:
// Android Emulator uses 10.0.2.2 to access host machine localhost.
// iOS simulator uses localhost. Physical device uses local machine IP.
const getBaseUrl = () => {
  const custom = Constants.expoConfig?.extra?.apiBaseUrl;
  if (custom) return custom;

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000/api';
  }
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getBaseUrl();

class ApiService {
  static async getToken() {
    return await AsyncStorage.getItem('borqan_access_token');
  }

  static async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = await this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {}),
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        await AsyncStorage.removeItem('borqan_access_token');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP Error ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.warn(`[Mobile API] Error on ${endpoint}:`, error.message);
      throw error;
    }
  }

  // --- Endpoints ---

  static async getTutors() {
    return this.request('/tutors/');
  }

  static async loginWithTelegram(telegramData: { id: string; first_name: string; username?: string }) {
    return this.request('/auth/telegram/', {
      method: 'POST',
      body: JSON.stringify(telegramData),
    });
  }

  static async submitVodafonePayment(data: {
    student_name: string;
    phone: string;
    plan_name: string;
    amount: string;
    transaction_id: string;
  }) {
    return this.request('/payments/vodafone/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async triggerFawryPayment(studentId: string, amount: number) {
    return this.request('/payments/fawry/webhook/', {
      method: 'POST',
      body: JSON.stringify({ student_id: studentId, amount }),
    });
  }
}

export default ApiService;
