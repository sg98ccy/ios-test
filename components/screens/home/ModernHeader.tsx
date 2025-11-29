import * as React from 'react';
import { View, Pressable, ImageBackground } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Moon, Sun } from 'lucide-react-native';
import { cn } from '@/lib/utils';

// =========================[ MODERN HEADER ]==================================

interface ModernHeaderProps {
  userName?: string;
  userInitials?: string;
  avatarUrl?: string;
  greeting?: string;
}

export function ModernHeader({
  userName = 'Guest',
  userInitials = 'GU',
  avatarUrl,
  greeting,
}: ModernHeaderProps) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    if (greeting) return greeting;
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View className="overflow-hidden">
      <ImageBackground
        source={require('@/assets/images/hive.jpg')}
        className="px-6 pb-6"
        style={{ paddingTop: insets.top + 16 }}
        imageStyle={{ opacity: colorScheme === 'dark' ? 0.3 : 0.6 }}
      >
        <View className="absolute inset-0 bg-black/40" />
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center gap-3">
            <Avatar className="h-14 w-14 border-2 border-white/20" alt="User avatar">
              {avatarUrl ? (
                <AvatarImage source={{ uri: avatarUrl }} />
              ) : (
                <AvatarFallback className="bg-white/20">
                  <Text className="text-lg font-bold text-white">{userInitials}</Text>
                </AvatarFallback>
              )}
            </Avatar>
            <View className="flex-1">
              <Text className="text-sm font-medium text-white/80">{getGreeting()}</Text>
              <Text className="text-xl font-bold text-white">{userName}</Text>
            </View>
          </View>

          <Pressable
            onPress={toggleColorScheme}
            className={cn(
              'h-10 w-10 items-center justify-center rounded-full bg-white/20',
              'active:bg-white/30'
            )}
          >
            <Icon
              as={colorScheme === 'dark' ? Sun : Moon}
              size={20}
              className="text-white"
              strokeWidth={2}
            />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
