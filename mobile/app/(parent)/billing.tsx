import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import { colors } from '@/theme/colors';

export default function ParentBillingScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isDark } = useAppTheme();
  const activeColors = isDark ? colors.dark : colors.light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: activeColors.text, fontWeight: 'bold' }}>
          الفاتورة العائلية الموحدة 💳
        </Text>
        <Text variant="bodySmall" style={{ color: activeColors.textSecondary, marginTop: 4 }}>
          تسديد شهري موحد وتوزيع رصيد الجلسات بين الأبناء بسهولة
        </Text>
      </View>

      <View style={styles.content}>
        {/* Pool Stats Card */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content style={styles.poolRow}>
            <View>
              <Text variant="headlineMedium" style={{ color: activeColors.primary, fontWeight: 'bold' }}>
                20 جلسة
              </Text>
              <Text variant="bodySmall" style={{ color: activeColors.textSecondary }}>
                إجمالي رصيد الباقة العائلية
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text variant="headlineMedium" style={{ color: activeColors.secondary, fontWeight: 'bold' }}>
                16 جلسة
              </Text>
              <Text variant="bodySmall" style={{ color: activeColors.textSecondary }}>
                موزعة على الأبناء
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Breakdown Card */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content style={{ gap: 10 }}>
            <Text variant="titleMedium" style={{ color: activeColors.text, fontWeight: 'bold' }}>
              تفاصيل التوزيع الحالي
            </Text>
            <View style={styles.itemRow}>
              <Text variant="bodyMedium" style={{ color: activeColors.text }}>
                عمر محمود (طالب):
              </Text>
              <Text variant="bodyMedium" style={{ color: activeColors.primary, fontWeight: 'bold' }}>
                8 جلسات شهرياً
              </Text>
            </View>
            <Divider style={{ backgroundColor: activeColors.border }} />
            <View style={styles.itemRow}>
              <Text variant="bodyMedium" style={{ color: activeColors.text }}>
                مريم محمود (طالبة):
              </Text>
              <Text variant="bodyMedium" style={{ color: activeColors.primary, fontWeight: 'bold' }}>
                8 جلسات شهرياً
              </Text>
            </View>
            <Divider style={{ backgroundColor: activeColors.border }} />
            <View style={styles.itemRow}>
              <Text variant="bodyMedium" style={{ color: activeColors.textMuted }}>
                رصيد حر متبقي للتوزيع:
              </Text>
              <Text variant="bodyMedium" style={{ color: activeColors.secondary, fontWeight: 'bold' }}>
                4 جلسات
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Direct Payment for Family Pack */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content style={{ gap: 12 }}>
            <Text variant="titleMedium" style={{ color: activeColors.text, fontWeight: 'bold' }}>
              تجديد الباقة العائلية (دفع مباشر)
            </Text>
            <Text variant="bodySmall" style={{ color: activeColors.textSecondary }}>
              قيمة الباقة العائلية (20 جلسة): 750 جنيه مصري.
            </Text>
            <Button
              mode="contained"
              icon="cash-multiple"
              onPress={() => alert('يمكنك التحويل عبر فودافون كاش أو إنستاباي إلى: 01019887766')}
              style={{ backgroundColor: activeColors.primary, borderRadius: 14 }}
              labelStyle={{ color: activeColors.onPrimary, fontWeight: 'bold' }}
            >
              تجديد عبر فودافون كاش / إنستاباي
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 14 },
  content: { paddingHorizontal: 16, gap: 14, paddingBottom: 24 },
  card: { borderWidth: 1, borderRadius: 22 },
  poolRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
