import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import ar from './ar.json';
import en from './en.json';

const LANGUAGE_KEY = 'borqan_app_language';

const resources = {
  ar: { translation: ar },
  en: { translation: en },
};

export const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

  if (!savedLanguage) {
    const deviceLocales = Localization.getLocales();
    const primaryCode = deviceLocales?.[0]?.languageCode;
    savedLanguage = primaryCode === 'ar' ? 'ar' : 'ar'; // Default Arabic
  }

  const isRTL = savedLanguage === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }

  await i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      lng: savedLanguage,
      fallbackLng: 'ar',
      interpolation: {
        escapeValue: false,
      },
    });

  return i18n;
};

export const changeAppLanguage = async (lng: 'ar' | 'en') => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  await i18n.changeLanguage(lng);
  const isRTL = lng === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }
};

export default i18n;
