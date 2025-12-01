import { Link, Stack } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ModernHeader } from '@/components/screens/home/ModernHeader';
import { StatsSection } from '@/components/screens/home/StatsSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react-native';
import { CATEGORIES, getCategoryProgress } from '@/lib/categories';
import { useIOSTest } from '@/lib/IOSTestContext';

// =========================[ HOME SCREEN ]==================================

export default function HomeScreen() {
  const { testResults } = useIOSTest();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-background">
        <ModernHeader userName="iOS Tester" userInitials="IT" />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-6 p-4">
            <StatsSection />

            <View className="gap-3">
              <Text variant="h4" className="mb-1 text-xl">
                Test Categories
              </Text>
              <View className="gap-3">
                {CATEGORIES.map((category) => {
                  const progress = getCategoryProgress(testResults, category);
                  const href = { pathname: '/category/[id]', params: { id: category.id } } as const;

                  return (
                    <Link
                      key={category.id}
                      href={href as any}
                      asChild
                      className="rounded-xl"
                    >
                      <Pressable>
                        <Card
                          className={
                            progress.isComplete ? 'border-green-500' : 'border-border bg-card'
                          }
                        >
                          <CardHeader className="flex-row items-start gap-4">
                            <View
                              className="h-12 w-12 items-center justify-center rounded-xl"
                              style={{ backgroundColor: `${category.color}1a` }}
                            >
                              <Icon
                                as={category.icon}
                                size={24}
                                color={category.color}
                                strokeWidth={2.5}
                              />
                            </View>
                            <View className="flex-1 gap-1">
                              <CardTitle className="text-lg">{category.title}</CardTitle>
                              <Text className="text-sm text-muted-foreground">
                                {category.description}
                              </Text>
                            </View>
                            {progress.isComplete ? (
                              <Badge variant="success" className="flex-row items-center gap-1">
                                <Icon as={Check} size={14} className="text-white" />
                                <Text>Done</Text>
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="border-muted-foreground/30 text-xs"
                              >
                                <Text className="text-muted-foreground">
                                  {progress.completed}/{progress.total}
                                </Text>
                              </Badge>
                            )}
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Text className="text-xs text-muted-foreground">
                              Tap to open tests for this category
                            </Text>
                          </CardContent>
                        </Card>
                      </Pressable>
                    </Link>
                  );
                })}
              </View>
            </View>

            {/* Bottom padding for comfortable scrolling */}
            <View className="h-6" />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
