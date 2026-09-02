import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setThemeMode: () => {},
});

const THEME_STORAGE_KEY = 'borqan_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('dark'); // Default to dark rosewood

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        setMode(saved);
      } else if (systemScheme === 'dark' || systemScheme === 'light') {
        setMode(systemScheme);
      }
    };
    loadTheme();
  }, [systemScheme]);

  const toggleTheme = async () => {
    const nextMode: ThemeMode = mode === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
  };

  const setThemeMode = async (newMode: ThemeMode) => {
    setMode(newMode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, isDark: mode === 'dark', toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
