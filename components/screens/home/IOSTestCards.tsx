import * as React from 'react';
import { View, Pressable, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Device from 'expo-device';
import * as Brightness from 'expo-brightness';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  Bell,
  Vibrate,
  Camera as CameraIcon,
  MapPin,
  Calendar,
  Users,
  Fingerprint,
  Smartphone,
  Sun as SunIcon,
  Activity,
} from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { useIOSTest } from '@/lib/IOSTestContext';

// =========================[ NOTIFICATION TEST ]==================================

export function NotificationTestCard() {
  const [status, setStatus] = React.useState<'idle' | 'granted' | 'denied'>('idle');
  const { addTestResult } = useIOSTest();

  const testNotification = async () => {
    try {
      // Request permissions
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

      // Configure notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      // Schedule a notification
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
    <Pressable onPress={testNotification}>
      <Card className="overflow-hidden border-blue-200 dark:border-blue-900">
        <CardHeader className="bg-blue-50 dark:bg-blue-950/30">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
                <Icon as={Bell} size={24} className="text-white" />
              </View>
              <View className="flex-1">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Test push notifications</CardDescription>
              </View>
            </View>
            {status !== 'idle' && (
              <Badge variant={status === 'granted' ? 'success' : 'destructive'}>
                <Text>{status === 'granted' ? 'Granted' : 'Denied'}</Text>
              </Badge>
            )}
          </View>
        </CardHeader>
        <CardContent className="py-3">
          <Text className="text-sm text-muted-foreground">
            Tap to schedule a test notification
          </Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}

// =========================[ HAPTICS TEST ]==================================

export function HapticsTestCard() {
  const { addTestResult } = useIOSTest();
  
  const testHaptics = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 200);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 400);

      Alert.alert('Success', 'Feel the vibrations? That\'s haptic feedback in action!');
      addTestResult('haptics', 'success');
    } catch (error) {
      Alert.alert('Error', `Haptics test failed: ${error}`);
      addTestResult('haptics', 'failed');
    }
  };

  return (
    <Pressable onPress={testHaptics}>
      <Card className="overflow-hidden border-purple-200 dark:border-purple-900">
        <CardHeader className="bg-purple-50 dark:bg-purple-950/30">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-purple-500">
              <Icon as={Vibrate} size={24} className="text-white" />
            </View>
            <View className="flex-1">
              <CardTitle className="text-lg">Haptic Feedback</CardTitle>
              <CardDescription>Test device vibrations</CardDescription>
            </View>
          </View>
        </CardHeader>
        <CardContent className="py-3">
          <Text className="text-sm text-muted-foreground">Tap to feel haptic patterns</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}

// =========================[ CAMERA TEST ]==================================

export function CameraTestCard() {
  const [status, setStatus] = React.useState<'idle' | 'granted' | 'denied'>('idle');
  const { addTestResult } = useIOSTest();

  const testCamera = async () => {
    try {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setStatus(cameraStatus === 'granted' ? 'granted' : 'denied');

      if (cameraStatus === 'granted') {
        Alert.alert('Success', 'Camera permission granted! Ready to take photos.');
        addTestResult('camera', 'success');
      } else {
        Alert.alert('Permission denied', 'Camera access is required to take photos.');
        addTestResult('camera', 'failed');
      }
    } catch (error) {
      Alert.alert('Error', `Camera test failed: ${error}`);
      addTestResult('camera', 'failed');
    }
  };

  return (
    <Pressable onPress={testCamera}>
      <Card className="overflow-hidden border-green-200 dark:border-green-900">
        <CardHeader className="bg-green-50 dark:bg-green-950/30">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-green-500">
                <Icon as={CameraIcon} size={24} className="text-white" />
              </View>
              <View className="flex-1">
                <CardTitle className="text-lg">Camera</CardTitle>
                <CardDescription>Access device camera</CardDescription>
              </View>
            </View>
            {status !== 'idle' && (
              <Badge variant={status === 'granted' ? 'success' : 'destructive'}>
                <Text>{status === 'granted' ? 'Granted' : 'Denied'}</Text>
              </Badge>
            )}
          </View>
        </CardHeader>
        <CardContent className="py-3">
          <Text className="text-sm text-muted-foreground">Tap to request camera permission</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}

// =========================[ LOCATION TEST ]==================================

export function LocationTestCard() {
  const [status, setStatus] = React.useState<'idle' | 'granted' | 'denied'>('idle');
  const { addTestResult } = useIOSTest();

  const testLocation = async () => {
    try {
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setStatus(locationStatus === 'granted' ? 'granted' : 'denied');

      if (locationStatus !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required.');
        addTestResult('location', 'failed');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      Alert.alert(
        'Location Found',
        `Lat: ${location.coords.latitude.toFixed(4)}\nLng: ${location.coords.longitude.toFixed(4)}`
      );
      addTestResult('location', 'success');
    } catch (error) {
      Alert.alert('Error', `Location test failed: ${error}`);
      addTestResult('location', 'failed');
    }
  };

  return (
    <Pressable onPress={testLocation}>
      <Card className="overflow-hidden border-orange-200 dark:border-orange-900">
        <CardHeader className="bg-orange-50 dark:bg-orange-950/30">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
                <Icon as={MapPin} size={24} className="text-white" />
              </View>
              <View className="flex-1">
                <CardTitle className="text-lg">Location</CardTitle>
                <CardDescription>Get device location</CardDescription>
              </View>
            </View>
            {status !== 'idle' && (
              <Badge variant={status === 'granted' ? 'success' : 'destructive'}>
                <Text>{status === 'granted' ? 'Granted' : 'Denied'}</Text>
              </Badge>
            )}
          </View>
        </CardHeader>
        <CardContent className="py-3">
          <Text className="text-sm text-muted-foreground">Tap to get current location</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}

// =========================[ BIOMETRICS TEST ]==================================

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
    <Pressable onPress={testBiometrics}>
      <Card className="overflow-hidden border-pink-200 dark:border-pink-900">
        <CardHeader className="bg-pink-50 dark:bg-pink-950/30">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-pink-500">
                <Icon as={Fingerprint} size={24} className="text-white" />
              </View>
              <View className="flex-1">
                <CardTitle className="text-lg">Biometrics</CardTitle>
                <CardDescription>Face ID / Touch ID</CardDescription>
              </View>
            </View>
            {status !== 'idle' && (
              <Badge variant={status === 'success' ? 'success' : 'destructive'}>
                <Text>{status === 'success' ? 'Verified' : 'Failed'}</Text>
              </Badge>
            )}
          </View>
        </CardHeader>
        <CardContent className="py-3">
          <Text className="text-sm text-muted-foreground">Tap to authenticate</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}

// =========================[ DEVICE INFO TEST ]==================================

export function DeviceInfoCard() {
  const [info, setInfo] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const getDeviceInfo = async () => {
    try {
      const deviceInfo = {
        Brand: Device.brand,
        Model: Device.modelName,
        OS: `${Device.osName} ${Device.osVersion}`,
        Device: Device.deviceName,
        Year: Device.deviceYearClass,
      };

      const infoText = Object.entries(deviceInfo)
        .map(([key, value]) => `${key}: ${value || 'Unknown'}`)
        .join('\n');

      setInfo(infoText);
      Alert.alert('Device Information', infoText);
      addTestResult('deviceInfo', 'success');
    } catch (error) {
      Alert.alert('Error', `Device info test failed: ${error}`);
      addTestResult('deviceInfo', 'failed');
    }
  };

  return (
    <Pressable onPress={getDeviceInfo}>
      <Card className="overflow-hidden border-cyan-200 dark:border-cyan-900">
        <CardHeader className="bg-cyan-50 dark:bg-cyan-950/30">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-cyan-500">
              <Icon as={Smartphone} size={24} className="text-white" />
            </View>
            <View className="flex-1">
              <CardTitle className="text-lg">Device Info</CardTitle>
              <CardDescription>Get device details</CardDescription>
            </View>
          </View>
        </CardHeader>
        <CardContent className="py-3">
          <Text className="text-sm text-muted-foreground">Tap to view device information</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}

// =========================[ BRIGHTNESS TEST ]==================================

export function BrightnessTestCard() {
  const [brightness, setBrightness] = React.useState<number>(0);
  const { addTestResult } = useIOSTest();

  const testBrightness = async () => {
    try {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Cannot control brightness without permission');
        addTestResult('brightness', 'failed');
        return;
      }

      const currentBrightness = await Brightness.getBrightnessAsync();
      setBrightness(currentBrightness);

      // Animate brightness
      await Brightness.setBrightnessAsync(0.2);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await Brightness.setBrightnessAsync(1.0);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await Brightness.setBrightnessAsync(currentBrightness);

      Alert.alert('Success', `Current brightness: ${(currentBrightness * 100).toFixed(0)}%`);
      addTestResult('brightness', 'success');
    } catch (error) {
      Alert.alert('Error', `Brightness test failed: ${error}`);
      addTestResult('brightness', 'failed');
    }
  };

  return (
    <Pressable onPress={testBrightness}>
      <Card className="overflow-hidden border-yellow-200 dark:border-yellow-900">
        <CardHeader className="bg-yellow-50 dark:bg-yellow-950/30">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-yellow-500">
              <Icon as={SunIcon} size={24} className="text-white" />
            </View>
            <View className="flex-1">
              <CardTitle className="text-lg">Brightness</CardTitle>
              <CardDescription>Control screen brightness</CardDescription>
            </View>
          </View>
        </CardHeader>
        <CardContent className="py-3">
          <Text className="text-sm text-muted-foreground">Tap to test brightness control</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}
