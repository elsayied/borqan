import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'طالب' | 'طالبة' | 'وليّ أمر' | 'وليّة أمر';

export interface UserProfile {
  name: string;
  role: UserRole;
  phone: string;
  age?: number;
  telegramId?: string;
  sessionsLeft: number;
  activePlan?: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (userData: Omit<UserProfile, 'isLoggedIn'>) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (newRole: UserRole) => Promise<void>;
  updateSessionsLeft: (count: number) => Promise<void>;
}

const AUTH_STORAGE_KEY = 'borqan_auth_user';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  switchRole: async () => {},
  updateSessionsLeft: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const saved = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.isLoggedIn) {
            setUser(parsed);
          }
        }
      } catch (err) {
        console.error('Error loading stored user:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: Omit<UserProfile, 'isLoggedIn'>) => {
    const fullUser: UserProfile = {
      ...userData,
      isLoggedIn: true,
    };
    setUser(fullUser);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fullUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const switchRole = async (newRole: UserRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
  };

  const updateSessionsLeft = async (count: number) => {
    if (!user) return;
    const updated = { ...user, sessionsLeft: count };
    setUser(updated);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, switchRole, updateSessionsLeft }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
