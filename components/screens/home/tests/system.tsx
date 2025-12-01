import * as React from 'react';
import { Alert, Share, ActionSheetIOS } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Share2, ListChecks } from 'lucide-react-native';
import { useIOSTest } from '@/lib/IOSTestContext';

export function ShareSheetCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const { addTestResult } = useIOSTest();

  const runShare = async () => {
    try {
      await Share.share({
        message: 'Hello from the iOS capability lab.',
        url: 'https://example.com',
      });
      setStatus('success');
      addTestResult('shareSheet', 'success');
    } catch (error) {
      setStatus('failed');
      addTestResult('shareSheet', 'failed');
      Alert.alert('Error', `Share failed: ${error}`);
    }
  };

  return (
    <TestCardShell
      title="Share Sheet"
      description="Invoke the native share sheet"
      icon={Share2}
      iconColor="#f97316"
      onPress={runShare}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Opened' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to open the share dialog.</Text>
    </TestCardShell>
  );
}

export function ActionSheetCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [selection, setSelection] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const openSheet = () => {
    try {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Option 1', 'Option 2'],
          cancelButtonIndex: 0,
          title: 'Action Sheet Test',
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            setSelection('Cancelled');
            setStatus('success');
            addTestResult('actionSheet', 'partial');
            return;
          }
          const choice = buttonIndex === 1 ? 'Option 1' : 'Option 2';
          setSelection(`Selected: ${choice}`);
          setStatus('success');
          addTestResult('actionSheet', 'success');
        }
      );
    } catch (error) {
      setSelection(`Error: ${String(error)}`);
      setStatus('failed');
      addTestResult('actionSheet', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Action Sheet"
      description="Native iOS action sheet"
      icon={ListChecks}
      iconColor="#fb923c"
      onPress={openSheet}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Opened' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to show options.</Text>
      {selection ? (
        <Text className="pt-2 text-xs text-muted-foreground">{selection}</Text>
      ) : null}
    </TestCardShell>
  );
}
