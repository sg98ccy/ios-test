import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Globe2, Activity } from 'lucide-react-native';
import * as Network from 'expo-network';
import { useIOSTest } from '@/lib/IOSTestContext';

export function NetworkRequestCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [info, setInfo] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const testRequest = async () => {
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const response = await fetch('https://httpbin.org/get', { signal: controller.signal });
      clearTimeout(timeout);
      const ms = Date.now() - start;
      setInfo(`Status: ${response.status} • ${ms}ms`);
      setStatus('success');
      addTestResult('networkRequest', 'success');
    } catch (error) {
      setInfo(`Failed: ${String(error)}`);
      setStatus('failed');
      addTestResult('networkRequest', 'failed');
    }
  };

  return (
    <TestCardShell
      title="HTTP Request"
      description="GET https://httpbin.org/get"
      icon={Globe2}
      iconColor="#6366f1"
      onPress={testRequest}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Online' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to perform a simple fetch.</Text>
      {info ? (
        <Text className="pt-2 text-xs text-muted-foreground" selectable>
          {info}
        </Text>
      ) : null}
    </TestCardShell>
  );
}

export function NetworkStatusCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [details, setDetails] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const checkStatus = async () => {
    try {
      const state = await Network.getNetworkStateAsync();
      const ip = await Network.getIpAddressAsync();
      setDetails(
        `Type: ${state.type}\nConnected: ${state.isConnected ? 'Yes' : 'No'}\nIP: ${ip || 'n/a'}`
      );
      setStatus('success');
      addTestResult('networkStatus', 'success');
    } catch (error) {
      setDetails(`Error: ${String(error)}`);
      setStatus('failed');
      addTestResult('networkStatus', 'failed');
    }
  };

  React.useEffect(() => {
    checkStatus();
  }, []);

  return (
    <TestCardShell
      title="Network Status"
      description="Connection type and IP"
      icon={Activity}
      iconColor="#818cf8"
      onPress={checkStatus}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Checked' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to refresh connectivity info.</Text>
      {details ? (
        <Text className="pt-2 text-xs text-muted-foreground" selectable>
          {details}
        </Text>
      ) : null}
    </TestCardShell>
  );
}
