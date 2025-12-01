import * as React from 'react';
import { Paths, File } from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Folder, Clipboard as ClipboardIcon } from 'lucide-react-native';
import { useIOSTest } from '@/lib/IOSTestContext';

// =========================[ File Storage Test ]==================================

export function FileStorageCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [details, setDetails] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const testFile = async () => {
    try {
      // Use the new expo-file-system v19 API
      const file = new File(Paths.document, 'io-test.json');
      const payload = { ts: Date.now(), note: 'File system smoke test' };
      
      // Write to file
      await file.write(JSON.stringify(payload, null, 2));
      
      // Read from file
      const content = await file.text();
      setDetails(`Saved and read ${content.length} chars\n${file.uri}`);
      setStatus('success');
      addTestResult('fileStorage', 'success');
    } catch (error) {
      setDetails(`Error: ${String(error)}`);
      setStatus('failed');
      addTestResult('fileStorage', 'failed');
    }
  };

  return (
    <TestCardShell
      title="File Storage"
      description="Write and read a JSON file"
      icon={Folder}
      iconColor="#f59e0b"
      onPress={testFile}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Saved' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to write/read in app storage.</Text>
      {details ? (
        <Text className="pt-2 text-xs text-muted-foreground" selectable>
          {details}
        </Text>
      ) : null}
    </TestCardShell>
  );
}

export function ClipboardCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [value, setValue] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const testClipboard = async () => {
    try {
      const text = `iOS Test ${new Date().toLocaleTimeString()}`;
      await Clipboard.setStringAsync(text);
      const read = await Clipboard.getStringAsync();
      setValue(read);
      setStatus('success');
      addTestResult('clipboard', 'success');
    } catch (error) {
      setValue(`Error: ${String(error)}`);
      setStatus('failed');
      addTestResult('clipboard', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Clipboard"
      description="Write and read clipboard text"
      icon={ClipboardIcon}
      iconColor="#d97706"
      onPress={testClipboard}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Copied' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">Tap to copy a sample string.</Text>
      {value ? (
        <Text className="pt-2 text-xs text-muted-foreground" selectable>
          {value}
        </Text>
      ) : null}
    </TestCardShell>
  );
}
