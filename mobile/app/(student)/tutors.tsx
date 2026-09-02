import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, Card, Button, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { colors } from '@/theme/colors';

interface Tutor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  ijazah: string;
  rating: number;
  studentsCount: number;
  avatar: string;
}

const mockTutors: Tutor[] = [
  {
    id: '1',
    name: 'الشيخ د. عبد الرحمن السعيد',
    title: 'مقرئ بالقراءات العشر المسندة',
    specialty: 'حفظ وتجويد وإتقان المتون',
    ijazah: 'إجازة مسندة إلى النبي ﷺ من طريق الشاطبية',
    rating: 4.9,
    studentsCount: 1420,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '2',
    name: 'الشيخة أستاذة فاطمة الزهراء',
    title: 'معلمة القراءات وأحكام التلاوة',
    specialty: 'تحفيظ النساء والأطفال وتصحيح المخارج',
    ijazah: 'إجازة برواية حفص عن عاصم ورواية قالون',
    rating: 5.0,
    studentsCount: 980,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  },
];

export default function StudentTutorsScreen() {
  const { t } = useTranslation();
  const { isDark } = useAppTheme();
  const activeColors = isDark ? colors.dark : colors.light;

  const renderTutorItem = ({ item }: { item: Tutor }) => (
    <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.topRow}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text variant="titleMedium" style={{ color: activeColors.text, fontWeight: 'bold' }}>
                {item.name}
              </Text>
              <Chip icon="circle" style={styles.onlineChip} textStyle={{ color: activeColors.secondary, fontSize: 10 }}>
                متاح الآن
              </Chip>
            </View>
            <Text variant="bodySmall" style={{ color: activeColors.primary }}>
              {item.title}
            </Text>
            <Text variant="bodySmall" style={{ color: activeColors.textMuted }}>
              ⭐ {item.rating} ({item.studentsCount} {t('tutors.students')})
            </Text>
          </View>
        </View>

        <View style={[styles.metaBox, { backgroundColor: activeColors.surfaceVariant }]}>
          <Text variant="bodySmall" style={{ color: activeColors.text }}>
            <Text style={{ fontWeight: 'bold' }}>{t('tutors.specialty')}: </Text>
            {item.specialty}
          </Text>
          <Text variant="bodySmall" style={{ color: activeColors.text, marginTop: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>{t('tutors.ijazah')}: </Text>
            {item.ijazah}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <Button
            mode="contained"
            icon="video"
            onPress={() => alert(`بدء الاتصال المرئي مع ${item.name} (Agora.io)`)}
            style={[styles.btn, { backgroundColor: activeColors.primary }]}
            labelStyle={{ color: activeColors.onPrimary, fontWeight: 'bold', fontSize: 12 }}
          >
            {t('tutors.callVideo')}
          </Button>
          <Button
            mode="outlined"
            icon="phone"
            onPress={() => alert(`بدء الاتصال الصوتي مع ${item.name}`)}
            style={[styles.btn, { borderColor: activeColors.primary }]}
            labelStyle={{ color: activeColors.primary, fontSize: 12 }}
          >
            {t('tutors.callAudio')}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: activeColors.text, fontWeight: 'bold' }}>
          {t('tutors.title')} 🎙️
        </Text>
        <Text variant="bodySmall" style={{ color: activeColors.textSecondary, marginTop: 4 }}>
          {t('tutors.subtitle')}
        </Text>
      </View>

      <FlatList
        data={mockTutors}
        keyExtractor={(item) => item.id}
        renderItem={renderTutorItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 14 },
  list: { paddingHorizontal: 16, gap: 14, paddingBottom: 20 },
  card: { borderWidth: 1, borderRadius: 24 },
  cardContent: { gap: 12 },
  topRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 20 },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  onlineChip: { height: 26, backgroundColor: 'transparent' },
  metaBox: { padding: 12, borderRadius: 16 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  btn: { flex: 1, borderRadius: 14 },
});
