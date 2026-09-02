import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Avatar, ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import { colors } from '@/theme/colors';

export default function StudentHomeScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isDark } = useAppTheme();
  const router = useRouter();
  const activeColors = isDark ? colors.dark : colors.light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]}>
      {/* Header Bar */}
      <View style={[styles.header, { borderBottomColor: activeColors.border }]}>
        <View>
          <Text variant="titleMedium" style={{ color: activeColors.textSecondary }}>
            {t('home.welcomeBack')}
          </Text>
          <Text variant="headlineSmall" style={[styles.name, { color: activeColors.text }]}>
            {user?.name || 'طالب القرآن'} 🌟
          </Text>
        </View>
        <Avatar.Text
          size={48}
          label={user?.name ? user.name[0] : 'ق'}
          style={{ backgroundColor: activeColors.primary }}
          color={activeColors.onPrimary}
        />
      </View>

      <View style={styles.content}>
        {/* Sessions Counter Card */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content style={styles.sessionCounterRow}>
            <View>
              <Text variant="headlineMedium" style={{ color: activeColors.secondary, fontWeight: 'bold' }}>
                {user?.sessionsLeft || 0}
              </Text>
              <Text variant="bodyMedium" style={{ color: activeColors.textSecondary }}>
                {t('home.sessionsLeft')}
              </Text>
            </View>
            <Button
              mode="contained"
              icon="video"
              onPress={() => router.push('/(student)/tutors')}
              style={{ backgroundColor: activeColors.primary }}
              labelStyle={{ color: activeColors.onPrimary, fontWeight: 'bold' }}
            >
              {t('home.joinCall')}
            </Button>
          </Card.Content>
        </Card>

        {/* Hifz Progress */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={{ color: activeColors.text, fontWeight: 'bold' }}>
                {t('home.progressSummary')} 📖
              </Text>
              <Text variant="labelLarge" style={{ color: activeColors.accent }}>
                75%
              </Text>
            </View>
            <ProgressBar progress={0.75} color={activeColors.accent} style={styles.progressBar} />
            <Text variant="bodySmall" style={{ color: activeColors.textSecondary, marginTop: 8 }}>
              السور المتقنة: الفاتحة، البقرة (1-100)، الملك، عمّ
            </Text>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: activeColors.text }]}>
          {t('home.quickActions')}
        </Text>

        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
            onPress={() => router.push('/(student)/study')}
          >
            <MaterialCommunityIcons name="book-open-page-variant" size={32} color={activeColors.primary} />
            <Text variant="titleSmall" style={{ color: activeColors.text, marginTop: 8, fontWeight: 'bold' }}>
              اختبارات التجويد
            </Text>
            <Text variant="bodySmall" style={{ color: activeColors.textMuted, textAlign: 'center' }}>
              تحديات واختبارات MCQ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
            onPress={() => router.push('/(student)/messages')}
          >
            <MaterialCommunityIcons name="clipboard-text-outline" size={32} color={activeColors.secondary} />
            <Text variant="titleSmall" style={{ color: activeColors.text, marginTop: 8, fontWeight: 'bold' }}>
              ملاحظات الشيخ
            </Text>
            <Text variant="bodySmall" style={{ color: activeColors.textMuted, textAlign: 'center' }}>
              نقاط الضعف والتوصيات
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  name: { fontWeight: '900', marginTop: 2 },
  content: { padding: 18, gap: 16 },
  card: { borderWidth: 1, borderRadius: 20 },
  sessionCounterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressBar: { height: 10, borderRadius: 6 },
  sectionTitle: { fontWeight: 'bold', marginTop: 8 },
  quickGrid: { flexDirection: 'row', gap: 12 },
  quickCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
});
