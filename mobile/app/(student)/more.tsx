import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Switch, Button, Divider, Dialog, Portal, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import { changeAppLanguage } from '@/i18n';
import { colors } from '@/theme/colors';

export default function StudentMoreScreen() {
  const { t, i18n } = useTranslation();
  const { user, logout, switchRole } = useAuth();
  const { isDark, toggleTheme } = useAppTheme();
  const activeColors = isDark ? colors.dark : colors.light;

  // Direct Payment Modal State (Vodafone Cash / InstaPay / Fawry)
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'vodafone' | 'instapay' | 'fawry'>('vodafone');
  const [transactionRef, setTransactionRef] = useState('');

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    changeAppLanguage(nextLang);
  };

  const handleDirectPaymentSubmit = () => {
    if (!transactionRef) return;
    alert(`تم تسجيل إشعار الدفع بنجاح (${selectedMethod}): ${transactionRef}`);
    setPaymentVisible(false);
    setTransactionRef('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: activeColors.text, fontWeight: 'bold' }}>
          {t('more.profile')} & {t('more.settings')} ⚙️
        </Text>
      </View>

      <View style={styles.content}>
        {/* User Card */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: activeColors.text, fontWeight: 'bold' }}>
              {user?.name}
            </Text>
            <Text variant="bodySmall" style={{ color: activeColors.primary, marginTop: 2 }}>
              {user?.role} ({user?.age} سنة) • {user?.phone}
            </Text>
            <Text variant="bodySmall" style={{ color: activeColors.textMuted, marginTop: 4 }}>
              معرف التليجرام: {user?.telegramId || 'غير محدد'}
            </Text>
          </Card.Content>
        </Card>

        {/* Direct Payment / Session Purchase Option */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: activeColors.text, fontWeight: 'bold', marginBottom: 4 }}>
              {t('directPayment')} 💳
            </Text>
            <Text variant="bodySmall" style={{ color: activeColors.textSecondary, marginBottom: 12 }}>
              الدفع المباشر لكل جلسة أو باقة بدون محفظة عبر فودافون كاش أو إنستاباي أو فوري.
            </Text>
            <Button
              mode="contained"
              icon="credit-card-outline"
              onPress={() => setPaymentVisible(true)}
              style={{ backgroundColor: activeColors.primary }}
              labelStyle={{ color: activeColors.onPrimary, fontWeight: 'bold' }}
            >
              تسديد رسوم جلسة جديدة
            </Button>
          </Card.Content>
        </Card>

        {/* Preferences */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content style={{ paddingVertical: 4 }}>
            <List.Item
              title={t('more.theme')}
              description={isDark ? 'الوضع الداكن (Rosewood)' : 'الوضع الفاتح'}
              left={(props) => <List.Icon {...props} icon="theme-light-dark" color={activeColors.primary} />}
              right={() => <Switch value={isDark} onValueChange={toggleTheme} color={activeColors.primary} />}
              titleStyle={{ color: activeColors.text, fontWeight: 'bold' }}
              descriptionStyle={{ color: activeColors.textMuted }}
            />
            <Divider style={{ backgroundColor: activeColors.border }} />
            <List.Item
              title={t('more.language')}
              description={i18n.language === 'ar' ? 'العربية' : 'English'}
              left={(props) => <List.Icon {...props} icon="translate" color={activeColors.secondary} />}
              right={() => (
                <Button mode="text" onPress={toggleLanguage} labelStyle={{ color: activeColors.primary, fontWeight: 'bold' }}>
                  {i18n.language === 'ar' ? 'English' : 'عربي'}
                </Button>
              )}
              titleStyle={{ color: activeColors.text, fontWeight: 'bold' }}
              descriptionStyle={{ color: activeColors.textMuted }}
            />
          </Card.Content>
        </Card>

        {/* Role Switching Shortcut for Dual-Mode */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content>
            <Text variant="titleSmall" style={{ color: activeColors.text, fontWeight: 'bold', marginBottom: 6 }}>
              التبديل بين الحسابات 🔄
            </Text>
            <Button
              mode="outlined"
              icon="account-switch"
              onPress={() => switchRole('وليّ أمر')}
              style={{ borderColor: activeColors.primary }}
              labelStyle={{ color: activeColors.primary }}
            >
              التبديل إلى حساب وليّ الأمر
            </Button>
          </Card.Content>
        </Card>

        {/* Logout */}
        <Button
          mode="contained"
          icon="logout"
          onPress={logout}
          style={{ backgroundColor: '#be123c', borderRadius: 16, marginTop: 8 }}
          labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
        >
          {t('logout')}
        </Button>
      </View>

      {/* Direct Payment Dialog */}
      <Portal>
        <Dialog
          visible={paymentVisible}
          onDismiss={() => setPaymentVisible(false)}
          style={{ backgroundColor: activeColors.surface }}
        >
          <Dialog.Title style={{ color: activeColors.text, textAlign: 'right' }}>
            الدفع المباشر للخدمة ⚡
          </Dialog.Title>
          <Dialog.Content style={{ gap: 12 }}>
            <Text variant="bodySmall" style={{ color: activeColors.textSecondary, textAlign: 'right' }}>
              اختر طريقة الدفع وأدخل رقم التحويل أو الإيصال:
            </Text>

            <View style={styles.methodRow}>
              {(['vodafone', 'instapay', 'fawry'] as const).map((m) => (
                <Button
                  key={m}
                  mode={selectedMethod === m ? 'contained' : 'outlined'}
                  onPress={() => setSelectedMethod(m)}
                  style={{ flex: 1, borderRadius: 12 }}
                  labelStyle={{ fontSize: 11 }}
                >
                  {m === 'vodafone' ? 'فودافون' : m === 'instapay' ? 'إنستاباي' : 'فوري'}
                </Button>
              ))}
            </View>

            <Text variant="labelMedium" style={{ color: activeColors.primary, textAlign: 'right' }}>
              رقم المحفظة / العنوان: 01019887766
            </Text>

            <TextInput
              label="رقم العملية / المرجع"
              value={transactionRef}
              onChangeText={setTransactionRef}
              mode="outlined"
              textColor={activeColors.text}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPaymentVisible(false)}>إلغاء</Button>
            <Button onPress={handleDirectPaymentSubmit} textColor={activeColors.primary}>
              تأكيد الدفع
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 14 },
  content: { paddingHorizontal: 16, gap: 14, paddingBottom: 30 },
  card: { borderWidth: 1, borderRadius: 22 },
  methodRow: { flexDirection: 'row', gap: 6 },
});
