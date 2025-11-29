import { View } from 'react-native';
import { Avatar, Card, IconButton, Text } from 'react-native-paper';

// =========================[ QUICK ACTIONS SECTION ]==================================

const ACTIONS = [
  { title: 'Profile', subtitle: 'Manage your account', icon: 'account' },
  { title: 'Settings', subtitle: 'Configure preferences', icon: 'cog' },
  { title: 'Analytics', subtitle: 'View insights', icon: 'chart-line' },
];

export function QuickActionsSection() {
  return (
    <View className="gap-2">
      <Text variant="titleLarge" className="mb-2">
        Quick Actions
      </Text>
      {ACTIONS.map((action) => (
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
