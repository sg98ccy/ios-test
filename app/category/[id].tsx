import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Check, ArrowLeft } from 'lucide-react-native';
import { getCategoryById, getCategoryProgress } from '@/lib/categories';
import { useIOSTest } from '@/lib/IOSTestContext';
import { FEATURE_COMPONENTS } from '@/components/screens/home/tests';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { testResults } = useIOSTest();

  if (!id) {
    return <Redirect href="/" />;
  }

  const category = getCategoryById(id);

  if (!category) {
    return <Redirect href="/" />;
  }

  const progress = getCategoryProgress(testResults, category);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-background">
        <View
          className="flex-row items-center gap-3 px-4 pb-4"
          style={{ paddingTop: insets.top + 8 }}
        >
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full border border-border"
          >
            <Icon as={ArrowLeft} size={18} className="text-foreground" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-xs uppercase text-muted-foreground">Category</Text>
            <Text className="text-xl font-semibold">{category.title}</Text>
          </View>
          {progress.isComplete ? (
            <Badge variant="success" className="flex-row items-center gap-1">
              <Icon as={Check} size={14} className="text-white" />
              <Text>Done</Text>
            </Badge>
          ) : null}
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-4 p-4">
            <Card className={progress.isComplete ? 'border-green-500' : 'border-border'}>
              <CardHeader className="flex-row items-start gap-4">
                <View
                  className="h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${category.color}1a` }}
                >
                  <Icon as={category.icon} size={24} color={category.color} strokeWidth={2.5} />
                </View>
                <View className="flex-1 gap-1">
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <Text className="text-sm text-muted-foreground">{category.description}</Text>
                </View>
                <Badge variant="outline" className="border-muted-foreground/30">
                  <Text className="text-muted-foreground">
                    {progress.completed}/{progress.total}
                  </Text>
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <Text className="text-sm text-muted-foreground">
                  {progress.isComplete
                    ? 'All tests passed. This category is marked complete.'
                    : 'Complete each test below to mark this category as done.'}
                </Text>
              </CardContent>
            </Card>

            <View className="gap-3">
              {category.features.map((feature) => {
                const Component = FEATURE_COMPONENTS[feature];
                if (!Component) return null;
                return <Component key={feature} />;
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
