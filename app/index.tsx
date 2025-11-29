import { Stack } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { ModernHeader } from '@/components/screens/home/ModernHeader';
import { StatsSection } from '@/components/screens/home/StatsSection';
import {
  NotificationTestCard,
  HapticsTestCard,
  CameraTestCard,
  LocationTestCard,
  BiometricsTestCard,
  DeviceInfoCard,
  BrightnessTestCard,
} from '@/components/screens/home/IOSTestCards';
import { Text } from '@/components/ui/text';

// =========================[ HOME SCREEN ]==================================

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-background">
        <ModernHeader userName="iOS Tester" userInitials="IT" />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-6 p-4">
            <StatsSection />

            {/* Primary iOS Features */}
            <View className="gap-3">
              <Text variant="h4" className="mb-1 text-xl">
                Core iOS Features
              </Text>
              <NotificationTestCard />
              <BiometricsTestCard />
              <HapticsTestCard />
            </View>

            {/* Hardware & Sensors */}
            <View className="gap-3">
              <Text variant="h4" className="mb-1 text-xl">
                Hardware & Sensors
              </Text>
              <CameraTestCard />
              <LocationTestCard />
              <BrightnessTestCard />
              <DeviceInfoCard />
            </View>

            {/* Bottom padding for comfortable scrolling */}
            <View className="h-6" />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
