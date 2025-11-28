import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Chip,
  FAB,
  IconButton,
  Searchbar,
  Text,
  Surface,
} from 'react-native-paper';

// =========================[ MAIN SCREEN ]==================================

export default function Screen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1">
        <Appbar.Header>
          <Appbar.Content title="Home" />
          <IconButton
            icon={colorScheme === 'dark' ? 'white-balance-sunny' : 'moon-waning-crescent'}
            onPress={toggleColorScheme}
          />
        </Appbar.Header>

        <ScrollView className="flex-1">
          <View className="gap-4 p-4">
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              elevation={2}
            />

            <WelcomeCard />
            <FeaturesSection />
            <QuickActionsSection />
          </View>
        </ScrollView>

        <FAB icon="plus" style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }} />
      </View>
    </>
  );
}

// =========================[ WELCOME CARD ]==================================

function WelcomeCard() {
  return (
    <Card mode="elevated" elevation={3}>
      <Card.Cover
        source={{
          uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
        }}
      />
      <Card.Title
        title="Welcome Back!"
        subtitle="Ready to get started?"
        left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
      />
      <Card.Content>
        <Text variant="bodyMedium">
          This is your main dashboard. Explore the features below and start building something
          amazing with React Native Paper and Expo.
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text">Learn More</Button>
        <Button mode="contained">Get Started</Button>
      </Card.Actions>
    </Card>
  );
}

// =========================[ FEATURES SECTION ]==================================

function FeaturesSection() {
  const features = [
    { icon: 'palette', label: 'Theming', color: '#6200ee' },
    { icon: 'speedometer', label: 'Performance', color: '#03dac6' },
    { icon: 'shield-check', label: 'Secure', color: '#018786' },
    { icon: 'cellphone-link', label: 'Responsive', color: '#b00020' },
  ];

  return (
    <Surface elevation={2} className="rounded-lg p-4">
      <Text variant="titleLarge" className="mb-4">
        Key Features
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {features.map((feature) => (
          <Chip key={feature.label} icon={feature.icon} mode="flat">
            {feature.label}
          </Chip>
        ))}
      </View>
    </Surface>
  );
}

// =========================[ QUICK ACTIONS SECTION ]==================================

function QuickActionsSection() {
  const actions = [
    { title: 'Profile', subtitle: 'Manage your account', icon: 'account' },
    { title: 'Settings', subtitle: 'Configure preferences', icon: 'cog' },
    { title: 'Analytics', subtitle: 'View insights', icon: 'chart-line' },
  ];

  return (
    <View className="gap-2">
      <Text variant="titleLarge" className="mb-2">
        Quick Actions
      </Text>
      {actions.map((action) => (
        <Card key={action.title} mode="outlined">
          <Card.Title
            title={action.title}
            subtitle={action.subtitle}
            left={(props) => <Avatar.Icon {...props} icon={action.icon} />}
            right={(props) => <IconButton {...props} icon="chevron-right" />}
          />
        </Card>
      ))}
    </View>
  );
}
