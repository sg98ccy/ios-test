import * as React from 'react';
import { Alert } from 'react-native';
import * as Brightness from 'expo-brightness';
import * as Device from 'expo-device';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Camera as CameraIcon, MapPin, Sun as SunIcon, Smartphone } from 'lucide-react-native';
import { useIOSTest } from '@/lib/IOSTestContext';

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
    <TestCardShell
      title="Camera"
      description="Access device camera"
      icon={CameraIcon}
      iconColor="#22c55e"
      onPress={testCamera}
      isComplete={status === 'granted'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'granted' ? 'success' : 'destructive'}>
            <Text>{status === 'granted' ? 'Granted' : 'Denied'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to request camera permission</Text>
    </TestCardShell>
  );
}

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
    <TestCardShell
      title="Location"
      description="Get device location"
      icon={MapPin}
      iconColor="#f97316"
      onPress={testLocation}
      isComplete={status === 'granted'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'granted' ? 'success' : 'destructive'}>
            <Text>{status === 'granted' ? 'Granted' : 'Denied'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to get current location</Text>
    </TestCardShell>
  );
}

export function BrightnessTestCard() {
  const [brightness, setBrightness] = React.useState<number>(0);
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
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

      await Brightness.setBrightnessAsync(0.2);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await Brightness.setBrightnessAsync(1.0);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await Brightness.setBrightnessAsync(currentBrightness);

      Alert.alert('Success', `Current brightness: ${(currentBrightness * 100).toFixed(0)}%`);
      setStatus('success');
      addTestResult('brightness', 'success');
    } catch (error) {
      Alert.alert('Error', `Brightness test failed: ${error}`);
      setStatus('failed');
      addTestResult('brightness', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Brightness"
      description="Control screen brightness"
      icon={SunIcon}
      iconColor="#eab308"
      onPress={testBrightness}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Ran' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to test brightness control</Text>
      {status !== 'idle' ? (
        <Text className="pt-2 text-xs text-muted-foreground">
          Last brightness: {(brightness * 100).toFixed(0)}%
        </Text>
      ) : null}
    </TestCardShell>
  );
}

export function DeviceInfoCard() {
  const [info, setInfo] = React.useState<string>('');
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
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
      setStatus('success');
      addTestResult('deviceInfo', 'success');
    } catch (error) {
      Alert.alert('Error', `Device info test failed: ${error}`);
      setStatus('failed');
      addTestResult('deviceInfo', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Device Info"
      description="Get device details"
      icon={Smartphone}
      iconColor="#06b6d4"
      onPress={getDeviceInfo}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Done' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to view device information</Text>
      {info ? (
        <Text className="pt-2 text-xs text-muted-foreground">
          Last run:
          {'\n'}
          {info}
        </Text>
      ) : null}
    </TestCardShell>
  );
}
