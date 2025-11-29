import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CircleIcon, SquareIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

// =========================[ HEADER SECTION ]==================================

export function HeaderSection() {
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
