import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import {
  CheckIcon,
  CircleIcon,
  SquareIcon,
  TriangleIcon,
  XIcon,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

// =========================[ HEADER SECTION ]==================================

function HeaderSection() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text variant="h1" className="text-foreground">
          Reusables
        </Text>
        <Button
          onPress={toggleColorScheme}
          size="icon"
          variant="ghost"
          className="rounded-full">
          <Icon
            as={colorScheme === 'dark' ? CircleIcon : SquareIcon}
            className="size-5 text-foreground"
          />
        </Button>
      </View>
      <Text className="text-muted-foreground">
        A collection of accessible, reusable components built with React Native Reusables.
      </Text>
    </View>
  );
}

// =========================[ BUTTONS SECTION ]==================================

function ButtonsSection() {
  return (
    <View className="gap-3">
      <Text variant="h3" className="text-foreground">
        Buttons
      </Text>
      <View className="flex-row flex-wrap gap-3">
        <Button>
          <Text>Default</Text>
        </Button>
        <Button variant="secondary">
          <Text>Secondary</Text>
        </Button>
        <Button variant="outline">
          <Text>Outline</Text>
        </Button>
        <Button variant="ghost">
          <Text>Ghost</Text>
        </Button>
        <Button variant="destructive">
          <Text>Destructive</Text>
        </Button>
      </View>
      <View className="flex-row flex-wrap gap-3">
        <Button size="sm">
          <Text>Small</Text>
        </Button>
        <Button size="default">
          <Text>Default</Text>
        </Button>
        <Button size="lg">
          <Text>Large</Text>
        </Button>
        <Button size="icon" variant="outline">
          <Icon as={CheckIcon} className="size-5" />
        </Button>
      </View>
    </View>
  );
}

// =========================[ ICONS SECTION ]==================================

function IconsSection() {
  const icons = [
    { icon: CheckIcon, label: 'Check' },
    { icon: XIcon, label: 'Close' },
    { icon: CircleIcon, label: 'Circle' },
    { icon: SquareIcon, label: 'Square' },
    { icon: TriangleIcon, label: 'Triangle' },
  ];

  return (
    <View className="gap-3">
      <Text variant="h3" className="text-foreground">
        Icons
      </Text>
      <View className="flex-row flex-wrap gap-4">
        {icons.map((item) => (
          <View key={item.label} className="items-center gap-2">
            <View className="rounded-lg border border-border bg-card p-4">
              <Icon as={item.icon} className="size-6 text-foreground" />
            </View>
            <Text className="text-xs text-muted-foreground">{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// =========================[ TYPOGRAPHY SECTION ]==================================

function TypographySection() {
  return (
    <View className="gap-3">
      <Text variant="h3" className="text-foreground">
        Typography
      </Text>
      <View className="gap-2 rounded-lg border border-border bg-card p-4">
        <Text variant="h1" className="text-foreground">
          Heading 1
        </Text>
        <Text variant="h2" className="text-foreground">
          Heading 2
        </Text>
        <Text variant="h3" className="text-foreground">
          Heading 3
        </Text>
        <Text variant="h4" className="text-foreground">
          Heading 4
        </Text>
        <Text className="text-foreground">Body text with default styling</Text>
        <Text className="text-muted-foreground">Muted text for secondary content</Text>
        <Text variant="small" className="text-muted-foreground">
          Small text for captions
        </Text>
        <Text variant="large" className="text-foreground">
          Large text for emphasis
        </Text>
      </View>
    </View>
  );
}

// =========================[ CARDS SECTION ]==================================

function CardsSection() {
  const features = [
    {
      title: 'Accessible',
      description: 'Built with accessibility in mind from the ground up.',
      icon: CheckIcon,
    },
    {
      title: 'Composable',
      description: 'Combine components to create complex interfaces.',
      icon: SquareIcon,
    },
    {
      title: 'Customizable',
      description: 'Fully customizable with Tailwind CSS utility classes.',
      icon: CircleIcon,
    },
  ];

  return (
    <View className="gap-3">
      <Text variant="h3" className="text-foreground">
        Feature Cards
      </Text>
      <View className="gap-3">
        {features.map((feature) => (
          <View
            key={feature.title}
            className="gap-2 rounded-lg border border-border bg-card p-4">
            <View className="flex-row items-center gap-3">
              <View className="rounded-full bg-primary p-2">
                <Icon as={feature.icon} className="size-5 text-primary-foreground" />
              </View>
              <Text variant="h4" className="flex-1 text-foreground">
                {feature.title}
              </Text>
            </View>
            <Text className="text-muted-foreground">{feature.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
