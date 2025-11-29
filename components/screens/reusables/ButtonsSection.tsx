import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CheckIcon } from 'lucide-react-native';
import { View } from 'react-native';

// =========================[ BUTTONS SECTION ]==================================

export function ButtonsSection() {
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
