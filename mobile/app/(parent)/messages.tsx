import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, TextInput, IconButton, SegmentedButtons } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/contexts/ThemeContext';
import { colors } from '@/theme/colors';

export default function ParentMessagesScreen() {
  const { t } = useTranslation();
  const { isDark } = useAppTheme();
  const activeColors = isDark ? colors.dark : colors.light;

  const [selectedChild, setSelectedChild] = useState('ch_1');
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'tutor',
      text: 'السلام عليكم ورحمة الله، عمر اليوم أتم حفظ سورة الملك بإتقان ممتاز.',
      time: '11:00 ص',
    },
    {
      id: '2',
      sender: 'parent',
      text: 'وعليكم السلام يا شيخنا، جزاكم الله خيراً وبارك فيكم.',
      time: '11:05 ص',
    },
  ]);

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setMessages([
      ...messages,
      {
        id: String(Date.now()),
        sender: 'parent',
        text: inputMsg,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputMsg('');
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: activeColors.text, fontWeight: 'bold' }}>
          محادثات المعلمين 💬
        </Text>
        <Text variant="bodySmall" style={{ color: activeColors.textSecondary, marginTop: 4 }}>
          التواصل المباشر مع معلمي الأبناء لمتابعة مسار الحفظ والتجويد
        </Text>
      </View>

      <View style={styles.selector}>
        <SegmentedButtons
          value={selectedChild}
          onValueChange={setSelectedChild}
          buttons={[
            { value: 'ch_1', label: 'معلم عمر 👦' },
            { value: 'ch_2', label: 'معلمة مريم 👧' },
          ]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.chatList}>
        {messages.map((m) => {
          const isMe = m.sender === 'parent';
          return (
            <View
              key={m.id}
              style={[
                styles.bubble,
                isMe
                  ? [styles.myBubble, { backgroundColor: activeColors.primary }]
                  : [styles.otherBubble, { backgroundColor: activeColors.surface, borderColor: activeColors.border }],
              ]}
            >
              <Text
                variant="bodyMedium"
                style={{ color: isMe ? activeColors.onPrimary : activeColors.text, fontWeight: isMe ? 'bold' : 'normal' }}
              >
                {m.text}
              </Text>
              <Text
                variant="labelSmall"
                style={{
                  color: isMe ? activeColors.onPrimary : activeColors.textMuted,
                  marginTop: 4,
                  alignSelf: 'flex-start',
                }}
              >
                {m.time}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={[styles.inputRow, { backgroundColor: activeColors.surface, borderTopColor: activeColors.border }]}>
        <TextInput
          placeholder="اكتب استفسارك لمعلم الطفل..."
          value={inputMsg}
          onChangeText={setInputMsg}
          mode="outlined"
          style={[styles.input, { backgroundColor: activeColors.background }]}
          textColor={activeColors.text}
        />
        <IconButton icon="send" iconColor={activeColors.primary} size={24} onPress={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 12 },
  selector: { paddingHorizontal: 16, marginBottom: 10 },
  chatList: { flexGrow: 1, paddingHorizontal: 16, gap: 10, paddingBottom: 10 },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 18 },
  myBubble: { alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  otherBubble: { alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, gap: 8 },
  input: { flex: 1, height: 44 },
});
