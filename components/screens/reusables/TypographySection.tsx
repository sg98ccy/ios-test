import { Text } from '@/components/ui/text';
import { View } from 'react-native';

// =========================[ TYPOGRAPHY SECTION ]==================================

export function TypographySection() {
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
