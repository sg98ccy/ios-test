import type { IOSFeature } from '@/lib/IOSTestContext';
import { NotificationTestCard, HapticsTestCard, BiometricsTestCard } from './core';
import { CameraTestCard, LocationTestCard, BrightnessTestCard, DeviceInfoCard } from './hardware';
import { AudioTestCard } from './media';
import { NetworkRequestCard, NetworkStatusCard } from './network';
import { FileStorageCard, ClipboardCard } from './storage';
import { AccelerometerCard, GyroscopeCard } from './sensors';
import { ShareSheetCard, ActionSheetCard } from './system';
import { MapsLaunchCard } from './maps';
import { AccessibilityStatusCard } from './accessibility';

export {
  NotificationTestCard,
  HapticsTestCard,
  BiometricsTestCard,
  CameraTestCard,
  LocationTestCard,
  BrightnessTestCard,
  DeviceInfoCard,
  AudioTestCard,
  NetworkRequestCard,
  NetworkStatusCard,
  FileStorageCard,
  ClipboardCard,
  AccelerometerCard,
  GyroscopeCard,
  ShareSheetCard,
  ActionSheetCard,
  MapsLaunchCard,
  AccessibilityStatusCard,
};

export const FEATURE_COMPONENTS: Record<IOSFeature, React.ComponentType> = {
  notifications: NotificationTestCard,
  biometrics: BiometricsTestCard,
  haptics: HapticsTestCard,
  camera: CameraTestCard,
  location: LocationTestCard,
  brightness: BrightnessTestCard,
  deviceInfo: DeviceInfoCard,
  audioRecord: AudioTestCard,
  networkRequest: NetworkRequestCard,
  networkStatus: NetworkStatusCard,
  fileStorage: FileStorageCard,
  clipboard: ClipboardCard,
  accelerometer: AccelerometerCard,
  gyroscope: GyroscopeCard,
  shareSheet: ShareSheetCard,
  actionSheet: ActionSheetCard,
  mapsLaunch: MapsLaunchCard,
  accessibilityStatus: AccessibilityStatusCard,
};
