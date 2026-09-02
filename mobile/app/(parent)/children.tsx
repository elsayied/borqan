import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import { colors } from '@/theme/colors';

const mockChildren = [
  {
    id: 'ch_1',
    name: 'عمر محمود',
    gender: 'طالب',
    age: 9,
    allocatedSessions: 8,
    completedSessions: 6,
    assignedTutor: 'الشيخ د. عبد الرحمن السعيد',
    hifzProgress: 'جزء عمّ وجزء تبارك (سورة الملك والسجدة)',
    lastFeedback: 'تلاوة ممتازة مع تحسن ملحوظ في غُنّة الإخفاء الشفوي.',
  },
  {
    id: 'ch_2',
    name: 'مريم محمود',
    gender: 'طالبة',
    age: 12,
    allocatedSessions: 8,
    completedSessions: 7,
    assignedTutor: 'الشيخة أستاذة فاطمة الزهراء',
    hifzProgress: 'سورة البقرة وآل عمران',
    lastFeedback: 'أداء ممتاز وتم إرسال تسجيل الجلسة لواتساب وليّ الأمر.',
  },
];

export default function ParentChildrenScreen() {
  const { t } = useTranslation();
  const { user, switchRole, logout } = useAuth();
  const { isDark } = useAppTheme();
  const activeColors = isDark ? colors.dark : colors.light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.header}>
        <View>
          <Text variant="headlineSmall" style={{ color: activeColors.text, fontWeight: 'bold' }}>
            بوابة أولياء الأمور 👨‍👩‍👧‍👦
          </Text>
          <Text variant="bodySmall" style={{ color: activeColors.textSecondary, marginTop: 4 }}>
            {user?.role}: {user?.name}
          </Text>
        </View>

        <Button
          mode="text"
          onPress={() => switchRole('طالب')}
          labelStyle={{ color: activeColors.primary, fontSize: 11 }}
        >
          وضع الطالب 🔄
        </Button>
      </View>

      {/* WhatsApp Sync Notification Banner */}
      <Card style={[styles.bannerCard, { backgroundColor: '#064e3b', borderColor: '#059669' }]}>
        <Card.Content>
          <Text variant="labelLarge" style={{ color: '#34d399', fontWeight: 'bold' }}>
            تزامن الواتساب فوري ومفعل 📱
          </Text>
          <Text variant="bodySmall" style={{ color: '#ecfdf5', marginTop: 4 }}>
            تقارير الحفظ وتسجيلات الجلسات ترسل مباشرة إلى {user?.phone}.
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.content}>
        <Text variant="titleMedium" style={{ color: activeColors.text, fontWeight: 'bold' }}>
          بطاقات الأبناء المتابعين ({mockChildren.length})
        </Text>

        {mockChildren.map((child) => (
          <Card
            key={child.id}
            style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.childHeader}>
                <Text variant="titleMedium" style={{ color: activeColors.text, fontWeight: 'bold' }}>
                  {child.name} ({child.age} سنة) {child.gender === 'طالب' ? '👦' : '👧'}
                </Text>
                <Chip style={{ backgroundColor: activeColors.surfaceVariant }}>
                  {child.completedSessions} / {child.allocatedSessions} جلسة
                </Chip>
              </View>

              <Text variant="bodySmall" style={{ color: activeColors.primary }}>
                المعلم المخصص: {child.assignedTutor}
              </Text>

              <View style={[styles.box, { backgroundColor: activeColors.background }]}>
                <Text variant="bodySmall" style={{ color: activeColors.text }}>
                  <Text style={{ fontWeight: 'bold' }}>مستوى الحفظ: </Text>
                  {child.hifzProgress}
                </Text>
                <Text variant="bodySmall" style={{ color: '#fbbf24', marginTop: 4 }}>
                  <Text style={{ fontWeight: 'bold' }}>آخر ملاحظة: </Text>
                  {child.lastFeedback}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="outlined"
          icon="logout"
          onPress={logout}
          style={{ borderColor: '#be123c', borderRadius: 14, marginTop: 10 }}
          labelStyle={{ color: '#be123c' }}
        >
          {t('logout')}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  bannerCard: { marginHorizontal: 16, marginBottom: 14, borderWidth: 1, borderRadius: 18 },
  content: { paddingHorizontal: 16, gap: 14, paddingBottom: 24 },
  card: { borderWidth: 1, borderRadius: 20 },
  cardContent: { gap: 8 },
  childHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  box: { padding: 12, borderRadius: 14, marginTop: 4 },
});
