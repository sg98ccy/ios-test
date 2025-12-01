import * as React from 'react';
import { AccessibilityInfo } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Accessibility as AccessibilityIcon } from 'lucide-react-native';
import { useIOSTest } from '@/lib/IOSTestContext';

export function AccessibilityStatusCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [details, setDetails] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const checkAccessibility = async () => {
    try {
      const [screenReader, boldText, reduceMotion] = await Promise.all([
        AccessibilityInfo.isScreenReaderEnabled(),
        AccessibilityInfo.isBoldTextEnabled(),
        AccessibilityInfo.isReduceMotionEnabled(),
      ]);

      const summary = [
        `VoiceOver: ${screenReader ? 'On' : 'Off'}`,
        `Bold Text: ${boldText ? 'On' : 'Off'}`,
        `Reduce Motion: ${reduceMotion ? 'On' : 'Off'}`,
      ].join('\n');

      setDetails(summary);
      setStatus('success');
      addTestResult('accessibilityStatus', 'success');
    } catch (error) {
      setDetails(`Error: ${String(error)}`);
      setStatus('failed');
      addTestResult('accessibilityStatus', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Accessibility Status"
      description="Reads key accessibility settings"
      icon={AccessibilityIcon}
      iconColor="#a855f7"
      onPress={checkAccessibility}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Read' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to fetch current accessibility flags.</Text>
      {details ? (
        <Text className="pt-2 text-xs text-muted-foreground">{details}</Text>
      ) : null}
    </TestCardShell>
  );
}
