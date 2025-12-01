import type { LucideIcon } from 'lucide-react-native';
import {
  Activity,
  BellRing,
  Waves,
  Globe2,
  Folder,
  Radar,
  Layout,
  Map,
  Accessibility,
} from 'lucide-react-native';
import type { IOSFeature, TestResults } from '@/lib/IOSTestContext';

export type CategoryId =
  | 'core-experience'
  | 'hardware-sensors'
  | 'media-audio'
  | 'networking'
  | 'storage-files'
  | 'sensors'
  | 'ui-system'
  | 'maps-nav'
  | 'accessibility';

export type Category = {
  id: CategoryId;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: IOSFeature[];
};

export const CATEGORIES: Category[] = [
  {
    id: 'core-experience',
    title: 'Core Experience',
    description: 'Notifications, biometrics, and haptics',
    icon: BellRing,
    color: '#2563eb',
    features: ['notifications', 'biometrics', 'haptics'],
  },
  {
    id: 'hardware-sensors',
    title: 'Hardware & Sensors',
    description: 'Camera, location, brightness, device info',
    icon: Activity,
    color: '#16a34a',
    features: ['camera', 'location', 'brightness', 'deviceInfo'],
  },
  {
    id: 'media-audio',
    title: 'Media & Audio',
    description: 'Record and playback audio samples',
    icon: Waves,
    color: '#0ea5e9',
    features: ['audioRecord'],
  },
  {
    id: 'networking',
    title: 'Networking',
    description: 'Connectivity and HTTP requests',
    icon: Globe2,
    color: '#6366f1',
    features: ['networkRequest', 'networkStatus'],
  },
  {
    id: 'storage-files',
    title: 'Storage & Files',
    description: 'File system and clipboard checks',
    icon: Folder,
    color: '#f59e0b',
    features: ['fileStorage', 'clipboard'],
  },
  {
    id: 'sensors',
    title: 'Motion Sensors',
    description: 'Accelerometer and gyroscope readings',
    icon: Radar,
    color: '#14b8a6',
    features: ['accelerometer', 'gyroscope'],
  },
  {
    id: 'ui-system',
    title: 'UI & System',
    description: 'Share sheet and action sheet flows',
    icon: Layout,
    color: '#f97316',
    features: ['shareSheet', 'actionSheet'],
  },
  {
    id: 'maps-nav',
    title: 'Maps & Navigation',
    description: 'Launch native Maps with coordinates',
    icon: Map,
    color: '#22c55e',
    features: ['mapsLaunch'],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Screen reader and reduce motion checks',
    icon: Accessibility,
    color: '#a855f7',
    features: ['accessibilityStatus'],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export function getCategoryProgress(
  testResults: TestResults,
  category: Category
) {
  const total = category.features.length;
  const completed = category.features.filter((feature) => testResults[feature] === 'success').length;
  const isComplete = total > 0 && completed === total;

  return { completed, total, isComplete };
}
