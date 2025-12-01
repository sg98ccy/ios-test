import * as React from 'react';
import { Pressable, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type TestCardShellProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  badge?: React.ReactNode;
  onPress: () => void;
  children?: React.ReactNode;
  isComplete?: boolean;
};

export function TestCardShell({
  title,
  description,
  icon,
  iconColor,
  badge,
  onPress,
  children,
  isComplete,
}: TestCardShellProps) {
  return (
    <Pressable onPress={onPress}>
      <Card className={cn('border-border bg-card', isComplete && 'border-green-500')}>
        <CardHeader className="flex-row items-center gap-4">
          <View
            className="h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${iconColor}1a` }}
          >
            <Icon as={icon} size={24} color={iconColor} strokeWidth={2.5} />
          </View>
          <View className="flex-1 gap-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </View>
          {badge}
        </CardHeader>
        <CardContent className="pt-0">
          {children ? (
            children
          ) : (
            <Text className="text-sm text-muted-foreground">Tap to run this test</Text>
          )}
        </CardContent>
      </Card>
    </Pressable>
  );
}
