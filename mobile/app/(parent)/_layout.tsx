import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../contexts/ThemeContext';
import { colors } from '../../theme/colors';

export default function ParentTabsLayout() {
  const { t } = useTranslation();
  const { isDark } = useAppTheme();
  const activeColors = isDark ? colors.dark : colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: activeColors.surface,
          borderTopColor: activeColors.border,
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: activeColors.primary,
        tabBarInactiveTintColor: activeColors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="children"
        options={{
          title: t('parentTabs.children'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-child-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: t('parentTabs.messages'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          title: t('parentTabs.billing'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-sync-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
