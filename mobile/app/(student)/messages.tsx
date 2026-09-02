import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Card, TextInput, IconButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/contexts/ThemeContext';
import { colors } from '@/theme/colors';

interface ChatMessage {
  id: string;
  sender: 'teacher' | 'student';
  text: string;
  time: string;
}

export default function StudentMessagesScreen() {
  const { t } = useTranslation();
  const { isDark } = useAppTheme();
  const activeColors = isDark ? colors.dark : colors.light;

  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'teacher',
      text: 'السلام عليكم ورحمة الله، تلاوتك اليوم في سورة الملك كانت ممتازة. يرجى التركيز على مد الصلة الكبرى.',
      time: '10:30 ص',
    },
    {
      id: '2',
      sender: 'student',
      text: 'وعليكم السلام يا شيخنا، سأتدرب عليها الليلة إن شاء الله.',
      time: '10:32 ص',
    },
  ]);

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'student',
      text: inputMsg,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInputMsg('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: activeColors.text, fontWeight: 'bold' }}>
          {t('messages.title')} 💬
        </Text>
        <Text variant="bodySmall" style={{ color: activeColors.textSecondary, marginTop: 4 }}>
          {t('messages.subtitle')}
        </Text>
      </View>

      {/* Teacher Session Notes Banner */}
      <Card style={[styles.notesCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <Card.Content>
          <Text variant="titleSmall" style={{ color: activeColors.primary, fontWeight: 'bold' }}>
            📝 سجل الملاحظات وتصحيح التلاوة
          </Text>
          <Text variant="bodySmall" style={{ color: '#f87171', marginTop: 4 }}>
            • <Text style={{ fontWeight: 'bold' }}>نقاط الضعف:</Text> تفخيم الراء المكسورة وزمن الغنة.
          </Text>
          <Text variant="bodySmall" style={{ color: '#34d399', marginTop: 2 }}>
            • <Text style={{ fontWeight: 'bold' }}>التوصيات:</Text> تكرار الآيات من 1 إلى 15 يومياً 15 دقيقة.
          </Text>
        </Card.Content>
      </Card>

      {/* Direct Chat Thread */}
      <ScrollView contentContainerStyle={styles.chatList}>
        {messages.map((m) => {
          const isMe = m.sender === 'student';
          return (
            <View
              key={m.id}
              style={[
                styles.messageBubble,
                isMe
                  ? [styles.myBubble, { backgroundColor: activeColors.primary }]
                  : [styles.teacherBubble, { backgroundColor: activeColors.surface, borderColor: activeColors.border }],
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
                  alignSelf: 'flex-start',
                  marginTop: 4,
                }}
              >
                {m.time}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Chat Input */}
      <View style={[styles.inputRow, { backgroundColor: activeColors.surface, borderTopColor: activeColors.border }]}>
        <TextInput
          placeholder={t('messages.typeMessage')}
          value={inputMsg}
          onChangeText={setInputMsg}
          mode="outlined"
          style={[styles.input, { backgroundColor: activeColors.background }]}
          textColor={activeColors.text}
        />
        <IconButton
          icon="send"
          iconColor={activeColors.primary}
          size={24}
          onPress={handleSendMessage}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 10 },
  notesCard: { marginHorizontal: 16, marginBottom: 12, borderWidth: 1, borderRadius: 18 },
  chatList: { flexGrow: 1, paddingHorizontal: 16, gap: 10, paddingBottom: 10 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 18 },
  myBubble: { alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  teacherBubble: { alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, gap: 8 },
  input: { flex: 1, height: 44 },
});
