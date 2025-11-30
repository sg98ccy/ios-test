import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { CheckCircle2, Clock } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { IOS_FEATURES, useIOSTest } from '@/lib/IOSTestContext';

// =========================[ STATS SECTION ]==================================

interface StatItemProps {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  bgColor: string;
}

function StatItem({ label, value, icon, color, bgColor }: StatItemProps) {
  return (
    <View className={cn('flex-1 rounded-2xl p-4', bgColor)}>
      <View className="mb-3 flex-row items-center justify-between">
        <View className={cn('h-10 w-10 items-center justify-center rounded-xl', color)}>
          <Icon as={icon} size={20} className="text-white" />
        </View>
      </View>
      <Text className="text-2xl font-bold">{value}</Text>
      <Text className="text-sm text-muted-foreground">{label}</Text>
    </View>
  );
}

export function StatsSection() {
  const { getSuccessCount } = useIOSTest();
  const totalFeatures = IOS_FEATURES.length;
  const passedTests = getSuccessCount();
  const pendingTests = Math.max(totalFeatures - passedTests, 0);

  return (
    <View className="gap-3">
      <Text variant="h4" className="mb-1 text-xl">
        Quick Stats
      </Text>
      <View className="flex-row gap-3">
        <StatItem
          label="Tests Passed"
          value={`${passedTests}/${totalFeatures}`}
          icon={CheckCircle2}
          color="bg-green-500"
          bgColor="bg-green-50 dark:bg-green-950/30"
        />
        <StatItem
          label="Pending"
          icon={Clock}
          value={pendingTests}
          color="bg-orange-500"
          bgColor="bg-orange-50 dark:bg-orange-950/30"
        />
      </View>
    </View>
  );
}
