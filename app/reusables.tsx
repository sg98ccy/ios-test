import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderSection } from '@/components/screens/reusables/HeaderSection';
import { ButtonsSection } from '@/components/screens/reusables/ButtonsSection';
import { IconsSection } from '@/components/screens/reusables/IconsSection';
import { TypographySection } from '@/components/screens/reusables/TypographySection';
import { CardsSection } from '@/components/screens/reusables/CardsSection';

// =========================[ REUSABLES SCREEN ]==================================

export default function ReusablesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="gap-6 p-6" style={{ paddingTop: insets.top + 24 }}>
        <HeaderSection />
        <ButtonsSection />
        <IconsSection />
        <TypographySection />
        <CardsSection />
      </View>
    </ScrollView>
  );
}
