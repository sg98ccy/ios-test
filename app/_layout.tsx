import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { IOSTestProvider } from '@/lib/IOSTestContext';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { IconHome, IconSquare } from '@tabler/icons-react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// =========================[ FONT CONFIGURATION ]==================================

const fontConfig = {
  bodyLarge: {
    fontFamily: 'Inter_400Regular',
  },
  bodyMedium: {
    fontFamily: 'Inter_400Regular',
  },
  bodySmall: {
    fontFamily: 'Inter_400Regular',
  },
  labelLarge: {
    fontFamily: 'Inter_500Medium',
  },
  labelMedium: {
    fontFamily: 'Inter_500Medium',
  },
  labelSmall: {
    fontFamily: 'Inter_500Medium',
  },
  titleLarge: {
    fontFamily: 'Inter_600SemiBold',
  },
  titleMedium: {
    fontFamily: 'Inter_600SemiBold',
  },
  titleSmall: {
    fontFamily: 'Inter_600SemiBold',
  },
  headlineLarge: {
    fontFamily: 'Inter_700Bold',
  },
  headlineMedium: {
    fontFamily: 'Inter_700Bold',
  },
  headlineSmall: {
    fontFamily: 'Inter_700Bold',
  },
  displayLarge: {
    fontFamily: 'Inter_700Bold',
  },
  displayMedium: {
    fontFamily: 'Inter_700Bold',
  },
  displaySmall: {
    fontFamily: 'Inter_700Bold',
  },
};

// =========================[ ROOT LAYOUT ]==================================

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const lightTheme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig, isV3: true }),
  };

  const darkTheme = {
    ...MD3DarkTheme,
    fonts: configureFonts({ config: fontConfig, isV3: true }),
  };

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <IOSTestProvider>
        <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
              tabBarInactiveTintColor: colorScheme === 'dark' ? '#888' : '#666',
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Paper',
                tabBarIcon: ({ color, size }) => <IconHome size={size} color={color} />,
              }}
            />
            <Tabs.Screen
              name="reusables"
              options={{
                title: 'Reusables',
                tabBarIcon: ({ color, size }) => <IconSquare size={size} color={color} />,
              }}
            />
          </Tabs>
          <PortalHost />
        </PaperProvider>
      </IOSTestProvider>
    </ThemeProvider>
  );
}
