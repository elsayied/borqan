import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Card, SegmentedButtons, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { useAppTheme } from '../../contexts/ThemeContext';
import { colors } from '../../theme/colors';

export default function LoginScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isDark } = useAppTheme();
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>('طالب');
  const [name, setName] = useState('أحمد محمود');
  const [phone, setPhone] = useState('+20 101 234 5678');
  const [age, setAge] = useState('14');
  const [telegramId, setTelegramId] = useState('@student_borqan');
  const [loading, setLoading] = useState(false);

  const activeColors = isDark ? colors.dark : colors.light;
  const isStudent = role === 'طالب' || role === 'طالبة';

  const handleLogin = async () => {
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      await login({
        name,
        role,
        phone,
        age: isStudent ? Number(age) || 12 : undefined,
        telegramId,
        sessionsLeft: isStudent ? 8 : 16,
        activePlan: isStudent ? 'باقة الشهر الكامل (8 جلسات)' : 'باقة العائلة الموحدة',
      });
      // Navigation happens automatically in RootNavigation
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={[styles.title, { color: activeColors.primary }]}>
            البرقَان 📖
          </Text>
          <Text variant="bodyMedium" style={[styles.subtitle, { color: activeColors.textSecondary }]}>
            {t('welcome')}
          </Text>
        </View>

        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleMedium" style={{ color: activeColors.text, marginBottom: 12, textAlign: 'right' }}>
              {t('selectRole')}
            </Text>

            <SegmentedButtons
              value={role}
              onValueChange={(val) => setRole(val as UserRole)}
              buttons={[
                { value: 'طالب', label: 'طالب 👦' },
                { value: 'طالبة', label: 'طالبة 👧' },
                { value: 'وليّ أمر', label: 'ولي أمر 👨' },
                { value: 'وليّة أمر', label: 'ولية أمر 👩' },
              ]}
              style={styles.segmented}
            />

            <TextInput
              label={t('name')}
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              textColor={activeColors.text}
            />

            <TextInput
              label={t('phone')}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              mode="outlined"
              style={styles.input}
              textColor={activeColors.text}
            />

            {isStudent && (
              <TextInput
                label={t('age')}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
                textColor={activeColors.text}
              />
            )}

            <TextInput
              label={t('telegramId')}
              value={telegramId}
              onChangeText={setTelegramId}
              mode="outlined"
              style={styles.input}
              textColor={activeColors.text}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              style={[styles.button, { backgroundColor: activeColors.primary }]}
              labelStyle={{ color: activeColors.onPrimary, fontWeight: 'bold' }}
            >
              {t('login')}
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 24 },
  title: { fontWeight: '900', textAlign: 'center', marginBottom: 6 },
  subtitle: { textAlign: 'center', lineHeight: 20 },
  card: { borderWidth: 1, borderRadius: 24, paddingVertical: 8 },
  cardContent: { gap: 14 },
  segmented: { marginBottom: 8 },
  input: { backgroundColor: 'transparent' },
  button: { marginTop: 8, paddingVertical: 6, borderRadius: 16 },
});
