import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';

import { ThemeProvider, useAppTheme } from '../contexts/ThemeContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { getPaperTheme } from '../theme/paperTheme';
import { initI18n } from '../i18n';
import { colors } from '../theme/colors';

function RootNavigation() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inStudentGroup = segments[0] === '(student)';
    const inParentGroup = segments[0] === '(parent)';

    if (!user) {
      // Redirect to login if unauthenticated
      if (!inAuthGroup) {
        router.replace('/(auth)/login');
      }
    } else {
      const isParent = user.role === 'وليّ أمر' || user.role === 'وليّة أمر';
      if (isParent && !inParentGroup) {
        router.replace('/(parent)/children');
      } else if (!isParent && !inStudentGroup) {
        router.replace('/(student)/home');
      }
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.dark.background }}>
        <ActivityIndicator size="large" color={colors.dark.primary} />
      </View>
    );
  }

  return <Slot />;
}

function MainApp() {
  const { isDark } = useAppTheme();
  const paperTheme = getPaperTheme(isDark);

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <RootNavigation />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setI18nReady(true));
  }, []);

  if (!i18nReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#140608' }}>
        <ActivityIndicator size="large" color="#ffd4a3" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
