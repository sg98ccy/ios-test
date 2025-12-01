import * as React from 'react';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Radar, Activity } from 'lucide-react-native';
import { useIOSTest } from '@/lib/IOSTestContext';

export function AccelerometerCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [reading, setReading] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const testAccelerometer = async () => {
    try {
      Accelerometer.setUpdateInterval(300);
      const subscription = Accelerometer.addListener(({ x, y, z }) => {
        setReading(`x: ${x.toFixed(2)} y: ${y.toFixed(2)} z: ${z.toFixed(2)}`);
      });
      await new Promise((resolve) => setTimeout(resolve, 1200));
      subscription.remove();
      setStatus('success');
      addTestResult('accelerometer', 'success');
    } catch (error) {
      setReading(`Error: ${String(error)}`);
      setStatus('failed');
      addTestResult('accelerometer', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Accelerometer"
      description="Capture motion samples"
      icon={Radar}
      iconColor="#14b8a6"
      onPress={testAccelerometer}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Read' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap and move the device.</Text>
      {reading ? (
        <Text className="pt-2 text-xs text-muted-foreground" selectable>
          {reading}
        </Text>
      ) : null}
    </TestCardShell>
  );
}

export function GyroscopeCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [reading, setReading] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const testGyroscope = async () => {
    try {
      Gyroscope.setUpdateInterval(300);
      const subscription = Gyroscope.addListener(({ x, y, z }) => {
        setReading(`x: ${x.toFixed(2)} y: ${y.toFixed(2)} z: ${z.toFixed(2)}`);
      });
      await new Promise((resolve) => setTimeout(resolve, 1200));
      subscription.remove();
      setStatus('success');
      addTestResult('gyroscope', 'success');
    } catch (error) {
      setReading(`Error: ${String(error)}`);
      setStatus('failed');
      addTestResult('gyroscope', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Gyroscope"
      description="Capture rotation samples"
      icon={Activity}
      iconColor="#10b981"
      onPress={testGyroscope}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Read' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap and rotate the device.</Text>
      {reading ? (
        <Text className="pt-2 text-xs text-muted-foreground" selectable>
          {reading}
        </Text>
      ) : null}
    </TestCardShell>
  );
}
