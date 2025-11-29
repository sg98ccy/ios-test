import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// =========================[ NOT FOUND SCREEN (MOBILE) ]==================================

export default function NotFoundScreen() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View
        className="flex-1 items-center justify-center gap-6 bg-background px-6"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View className="items-center gap-3">
          <Text variant="muted" className="text-center">
            (Testing Error Page)
          </Text>
          <Text variant="h1" className="text-center text-foreground">
            404
          </Text>
          <Text variant="h3" className="text-center text-foreground">
            Page Not Found
          </Text>
          <Text className="text-center text-muted-foreground">
            This screen doesn't exist. Let's get you back on track.
          </Text>
        </View>

        <Link href="/" asChild>
          <Button size="lg">
            <Text>Go to Home</Text>
          </Button>
        </Link>
      </View>
    </>
  );
}
