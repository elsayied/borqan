import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Chip, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { colors } from '@/theme/colors';

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'quiz';
  priceType: 'free' | 'paid';
  priceEgp: number;
  author: string;
}

const materialsData: Material[] = [
  {
    id: '1',
    title: 'ملخص أحكام النون الساكنة والتنوين (PDF)',
    type: 'pdf',
    priceType: 'free',
    priceEgp: 0,
    author: 'الشيخ د. عبد الرحمن السعيد',
  },
  {
    id: '2',
    title: 'شرح تحفة الأطفال كاملة بالصوت والصورة',
    type: 'video',
    priceType: 'paid',
    priceEgp: 45,
    author: 'الشيخة أستاذة فاطمة الزهراء',
  },
];

export default function StudentStudyScreen() {
  const { t } = useTranslation();
  const { isDark } = useAppTheme();
  const activeColors = isDark ? colors.dark : colors.light;

  // Simple MCQ Quiz State
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const quizQuestions = [
    {
      q: 'كم عدد أحكام النون الساكنة والتنوين؟',
      options: ['ثلاثة أحكام', 'أربعة أحكام (إظهار، إدغام، إقلاب، إخفاء)', 'خمسة أحكام'],
      correct: 1,
    },
    {
      q: 'ما هو حكم النون في قوله تعالى: (مِن بَعْدِ)؟',
      options: ['إظهار حلقي', 'إقلاب بميم مخفاة بغنة', 'إدغام بغنة'],
      correct: 1,
    },
  ];

  const handleSelectAnswer = (idx: number) => {
    setSelectedAnswer(idx);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[activeQuizQuestion].correct) {
      setQuizScore((prev) => (prev || 0) + 1);
    }
    if (activeQuizQuestion < quizQuestions.length - 1) {
      setActiveQuizQuestion(activeQuizQuestion + 1);
      setSelectedAnswer(null);
    } else {
      alert('أحسنت! أتممت اختبار التجويد بنجاح 🎉');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: activeColors.text, fontWeight: 'bold' }}>
          {t('study.title')} 📚
        </Text>
        <Text variant="bodySmall" style={{ color: activeColors.textSecondary, marginTop: 4 }}>
          {t('study.subtitle')}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Interactive MCQ Quiz Box */}
        <Card style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text variant="titleMedium" style={{ color: activeColors.primary, fontWeight: 'bold' }}>
                تحدي اليوم: أسئلة اختيار من متعدد (MCQ) 🧠
              </Text>
              <Chip textStyle={{ fontSize: 10 }}>سؤال {activeQuizQuestion + 1} / {quizQuestions.length}</Chip>
            </View>

            <Text variant="bodyLarge" style={[styles.questionText, { color: activeColors.text }]}>
              {quizQuestions[activeQuizQuestion].q}
            </Text>

            <View style={styles.optionsList}>
              {quizQuestions[activeQuizQuestion].options.map((opt, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.optionItem,
                    {
                      backgroundColor: selectedAnswer === idx ? activeColors.surfaceVariant : activeColors.background,
                      borderColor: selectedAnswer === idx ? activeColors.primary : activeColors.border,
                    },
                  ]}
                  onPress={() => handleSelectAnswer(idx)}
                >
                  <RadioButton
                    value={String(idx)}
                    status={selectedAnswer === idx ? 'checked' : 'unchecked'}
                    onPress={() => handleSelectAnswer(idx)}
                    color={activeColors.primary}
                  />
                  <Text variant="bodyMedium" style={{ color: activeColors.text, flex: 1 }}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button
              mode="contained"
              disabled={selectedAnswer === null}
              onPress={handleNextQuestion}
              style={[styles.btn, { backgroundColor: activeColors.primary }]}
              labelStyle={{ color: activeColors.onPrimary, fontWeight: 'bold' }}
            >
              {activeQuizQuestion < quizQuestions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار وحفظ النتيجة'}
            </Button>
          </Card.Content>
        </Card>

        {/* Study Materials List */}
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: activeColors.text }]}>
          {t('study.materials')} (PDF & فيديو) 📑
        </Text>

        {materialsData.map((mat) => (
          <Card
            key={mat.id}
            style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
          >
            <Card.Content style={styles.materialRow}>
              <MaterialCommunityIcons
                name={mat.type === 'pdf' ? 'file-pdf-box' : 'video-vintage'}
                size={40}
                color={mat.type === 'pdf' ? '#ef4444' : '#3b82f6'}
              />
              <View style={styles.materialInfo}>
                <Text variant="titleSmall" style={{ color: activeColors.text, fontWeight: 'bold' }}>
                  {mat.title}
                </Text>
                <Text variant="bodySmall" style={{ color: activeColors.textMuted }}>
                  إعداد: {mat.author}
                </Text>
                <View style={styles.badgeRow}>
                  <Chip
                    compact
                    style={{
                      backgroundColor: mat.priceType === 'free' ? '#064e3b' : '#78350f',
                      height: 24,
                    }}
                    textStyle={{ color: '#fff', fontSize: 10 }}
                  >
                    {mat.priceType === 'free' ? t('study.free') : `${mat.priceEgp} ج.م (شراء مباشر)`}
                  </Chip>
                </View>
              </View>
              <Button
                mode="contained-tonal"
                onPress={() => alert(`تحميل أو شراء: ${mat.title}`)}
                style={{ borderRadius: 12 }}
                labelStyle={{ fontSize: 11 }}
              >
                {mat.priceType === 'free' ? 'تحميل' : 'شراء'}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 14 },
  content: { paddingHorizontal: 16, gap: 14, paddingBottom: 24 },
  card: { borderWidth: 1, borderRadius: 24 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  questionText: { fontWeight: 'bold', marginVertical: 8, textAlign: 'right' },
  optionsList: { gap: 8, marginVertical: 10 },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  btn: { marginTop: 10, borderRadius: 14 },
  sectionTitle: { fontWeight: 'bold', marginTop: 10 },
  materialRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  materialInfo: { flex: 1 },
  badgeRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
});
