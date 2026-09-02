import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { colors } from './colors';

export const getPaperTheme = (isDark: boolean) => {
  const activeColors = isDark ? colors.dark : colors.light;
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: activeColors.primary,
      onPrimary: activeColors.onPrimary,
      secondary: activeColors.secondary,
      onSecondary: activeColors.onSecondary,
      background: activeColors.background,
      surface: activeColors.surface,
      surfaceVariant: activeColors.surfaceVariant,
      outline: activeColors.border,
      error: activeColors.error,
    },
    roundness: 16,
  };
};
