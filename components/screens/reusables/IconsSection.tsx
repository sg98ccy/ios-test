import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import {
  CheckIcon,
  CircleIcon,
  SquareIcon,
  TriangleIcon,
  XIcon,
} from 'lucide-react-native';
import { View } from 'react-native';

// =========================[ ICONS SECTION ]==================================

const ICONS = [
  { icon: CheckIcon, label: 'Check' },
  { icon: XIcon, label: 'Close' },
  { icon: CircleIcon, label: 'Circle' },
  { icon: SquareIcon, label: 'Square' },
  { icon: TriangleIcon, label: 'Triangle' },
];

export function IconsSection() {
  return (
    <View className="gap-3">
      <Text variant="h3" className="text-foreground">
        Icons
      </Text>
      <View className="flex-row flex-wrap gap-4">
        {ICONS.map((item) => (
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
