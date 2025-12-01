import * as React from 'react';
import { Alert, Linking } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Map } from 'lucide-react-native';
import { useIOSTest } from '@/lib/IOSTestContext';

export function MapsLaunchCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const { addTestResult } = useIOSTest();

  const openMaps = async () => {
    try {
      const url = 'maps://?q=Apple+Park&ll=37.3349,-122.0090';
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Unavailable', 'Maps cannot be opened on this device.');
        setStatus('failed');
        addTestResult('mapsLaunch', 'failed');
        return;
      }
      await Linking.openURL(url);
      setStatus('success');
      addTestResult('mapsLaunch', 'success');
    } catch (error) {
      setStatus('failed');
      addTestResult('mapsLaunch', 'failed');
      Alert.alert('Error', `Maps launch failed: ${error}`);
    }
  };

  return (
    <TestCardShell
      title="Open Maps"
      description="Launch Apple Maps to Apple Park"
      icon={Map}
      iconColor="#22c55e"
      onPress={openMaps}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Opened' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to jump to Maps.</Text>
    </TestCardShell>
  );
}
