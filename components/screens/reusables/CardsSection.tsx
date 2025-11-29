import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CheckIcon, CircleIcon, SquareIcon } from 'lucide-react-native';
import { View } from 'react-native';

// =========================[ CARDS SECTION ]==================================

const FEATURES = [
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

export function CardsSection() {
  return (
    <View className="gap-3">
      <Text variant="h3" className="text-foreground">
        Feature Cards
      </Text>
      <View className="gap-3">
        {FEATURES.map((feature) => (
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
