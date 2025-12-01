import * as React from 'react';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Bell, Vibrate, Fingerprint } from 'lucide-react-native';
import { useIOSTest } from '@/lib/IOSTestContext';

export function NotificationTestCard() {
  const [status, setStatus] = React.useState<'idle' | 'granted' | 'denied'>('idle');
  const { addTestResult } = useIOSTest();

  const testNotification = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        finalStatus = newStatus;
      }

      setStatus(finalStatus === 'granted' ? 'granted' : 'denied');

      if (finalStatus !== 'granted') {
        Alert.alert('Permission denied', 'Cannot send notifications without permission');
        return;
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'iOS Test 🔔',
          body: 'This is a test notification from your app!',
          data: { test: 'data' },
        },
        trigger: { seconds: 2 } as Notifications.NotificationTriggerInput,
      });

      Alert.alert('Success', 'Notification scheduled! You will receive it in 2 seconds.');
      addTestResult('notifications', finalStatus === 'granted' ? 'success' : 'partial');
    } catch (error) {
      Alert.alert('Error', `Failed to send notification: ${error}`);
      addTestResult('notifications', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Notifications"
      description="Test push notifications"
      icon={Bell}
      iconColor="#2563eb"
      onPress={testNotification}
      isComplete={status === 'granted'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'granted' ? 'success' : 'destructive'}>
            <Text>{status === 'granted' ? 'Granted' : 'Denied'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to schedule a test notification</Text>
    </TestCardShell>
  );
}

export function HapticsTestCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const { addTestResult } = useIOSTest();

  const testHaptics = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 200);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 400);

      Alert.alert('Success', "Feel the vibrations? That's haptic feedback in action!");
      setStatus('success');
      addTestResult('haptics', 'success');
    } catch (error) {
      Alert.alert('Error', `Haptics test failed: ${error}`);
      setStatus('failed');
      addTestResult('haptics', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Haptic Feedback"
      description="Test device vibrations"
      icon={Vibrate}
      iconColor="#7c3aed"
      onPress={testHaptics}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Ran' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to feel haptic patterns</Text>
    </TestCardShell>
  );
}

export function BiometricsTestCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const { addTestResult } = useIOSTest();

  const testBiometrics = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert('Not Available', 'Biometric authentication is not available on this device');
        addTestResult('biometrics', 'failed');
        return;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert(
          'Not Enrolled',
          'No biometric credentials enrolled. Please set up Face ID or Touch ID in Settings.'
        );
        addTestResult('biometrics', 'partial');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use Passcode',
      });

      setStatus(result.success ? 'success' : 'failed');

      if (result.success) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Success', 'Authentication successful! 🎉');
        addTestResult('biometrics', 'success');
      } else {
        Alert.alert('Failed', 'Authentication was cancelled or failed');
        addTestResult('biometrics', 'failed');
      }
    } catch (error) {
      Alert.alert('Error', `Biometrics test failed: ${error}`);
      addTestResult('biometrics', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Biometrics"
      description="Face ID / Touch ID"
      icon={Fingerprint}
      iconColor="#ec4899"
      onPress={testBiometrics}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Verified' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to authenticate</Text>
    </TestCardShell>
  );
}
