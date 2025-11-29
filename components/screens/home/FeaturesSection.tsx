import { View } from 'react-native';
import { Chip, Surface, Text } from 'react-native-paper';

// =========================[ FEATURES SECTION ]==================================

const FEATURES = [
  { icon: 'palette', label: 'Theming', color: '#6200ee' },
  { icon: 'speedometer', label: 'Performance', color: '#03dac6' },
  { icon: 'shield-check', label: 'Secure', color: '#018786' },
  { icon: 'cellphone-link', label: 'Responsive', color: '#b00020' },
];

export function FeaturesSection() {
  return (
    <Surface elevation={2} className="rounded-lg p-4">
      <Text variant="titleLarge" className="mb-4">
        Key Features
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {FEATURES.map((feature) => (
          <Chip key={feature.label} icon={feature.icon} mode="flat">
            {feature.label}
          </Chip>
        ))}
      </View>
    </Surface>
  );
}
