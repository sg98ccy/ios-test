import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, FAB, IconButton, Searchbar } from 'react-native-paper';
import { WelcomeCard } from '@/components/screens/home/WelcomeCard';
import { FeaturesSection } from '@/components/screens/home/FeaturesSection';
import { QuickActionsSection } from '@/components/screens/home/QuickActionsSection';

// =========================[ HOME SCREEN ]==================================

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1">
        <Appbar.Header>
          <Appbar.Content title="Home" />
          <IconButton
            icon={colorScheme === 'dark' ? 'white-balance-sunny' : 'moon-waning-crescent'}
            onPress={toggleColorScheme}
          />
        </Appbar.Header>

        <ScrollView className="flex-1">
          <View className="gap-4 p-4">
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              elevation={2}
            />

            <WelcomeCard />
            <FeaturesSection />
            <QuickActionsSection />
          </View>
        </ScrollView>

        <FAB icon="plus" style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }} />
      </View>
    </>
  );
}
