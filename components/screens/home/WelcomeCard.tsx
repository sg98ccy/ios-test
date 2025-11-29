import { Avatar, Button, Card, Text } from 'react-native-paper';

// =========================[ WELCOME CARD ]==================================

export function WelcomeCard() {
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
