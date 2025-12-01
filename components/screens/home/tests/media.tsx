import * as React from 'react';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TestCardShell } from './shared';
import { Music2 } from 'lucide-react-native';
import { useIOSTest } from '@/lib/IOSTestContext';

export function AudioTestCard() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'failed'>('idle');
  const [note, setNote] = React.useState<string>('');
  const { addTestResult } = useIOSTest();

  const testAudio = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission denied', 'Microphone permission is required to record.');
        setStatus('failed');
        addTestResult('audioRecord', 'failed');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();
      const { sound } = await recording.createNewLoadedSoundAsync();
      await sound.playAsync();
      setStatus('success');
      setNote(uri ? `Recorded to: ${uri}` : 'Recorded and played back');
      addTestResult('audioRecord', 'success');

      setTimeout(() => {
        sound.unloadAsync();
      }, 1500);
    } catch (error) {
      Alert.alert('Error', `Audio test failed: ${error}`);
      setStatus('failed');
      addTestResult('audioRecord', 'failed');
    }
  };

  return (
    <TestCardShell
      title="Audio Record & Play"
      description="Records 1s audio and plays it back"
      icon={Music2}
      iconColor="#0ea5e9"
      onPress={testAudio}
      isComplete={status === 'success'}
      badge={
        status !== 'idle' ? (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            <Text>{status === 'success' ? 'Recorded' : 'Failed'}</Text>
          </Badge>
        ) : null
      }
    >
      <Text className="text-sm text-muted-foreground">
        Tap to capture mic audio, then auto-play it.
      </Text>
      {note ? (
        <Text className="pt-2 text-xs text-muted-foreground" selectable>
          {note}
        </Text>
      ) : null}
    </TestCardShell>
  );
}
