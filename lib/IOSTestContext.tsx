import * as React from 'react';

// =========================[ TEST TRACKING CONTEXT ]==================================

export type IOSFeature =
  | 'notifications'
  | 'biometrics'
  | 'haptics'
  | 'camera'
  | 'location'
  | 'brightness'
  | 'deviceInfo';

export const IOS_FEATURES: IOSFeature[] = [
  'notifications',
  'biometrics',
  'haptics',
  'camera',
  'location',
  'brightness',
  'deviceInfo',
];

type TestStatus = 'success' | 'failed' | 'partial';
type TestResults = Partial<Record<IOSFeature, TestStatus>>;

interface IOSTestContextType {
  testResults: TestResults;
  addTestResult: (feature: IOSFeature, status: TestStatus) => void;
  getTestCount: () => number;
  getSuccessCount: () => number;
  getFailedCount: () => number;
  hasTestedFeature: (feature: IOSFeature) => boolean;
  clearResults: () => void;
}

const IOSTestContext = React.createContext<IOSTestContextType | undefined>(undefined);

export function IOSTestProvider({ children }: { children: React.ReactNode }) {
  const [testResults, setTestResults] = React.useState<TestResults>({});

  const getHigherPriorityStatus = React.useCallback((current: TestStatus | undefined, next: TestStatus) => {
    const priority: Record<TestStatus, number> = {
      failed: 0,
      partial: 1,
      success: 2,
    };

    if (!current) return next;
    return priority[next] >= priority[current] ? next : current;
  }, []);

  const addTestResult = React.useCallback(
    (feature: IOSFeature, status: TestStatus) => {
      setTestResults((prev) => {
        const nextStatus = getHigherPriorityStatus(prev[feature], status);
        if (nextStatus === prev[feature]) return prev;
        return {
          ...prev,
          [feature]: nextStatus,
        };
      });
    },
    [getHigherPriorityStatus]
  );

  const getTestCount = React.useCallback(() => {
    return Object.values(testResults).filter(Boolean).length;
  }, [testResults]);

  const getSuccessCount = React.useCallback(() => {
    return Object.values(testResults).filter((status): status is TestStatus => status === 'success')
      .length;
  }, [testResults]);

  const getFailedCount = React.useCallback(() => {
    return Object.values(testResults).filter((status): status is TestStatus => status === 'failed')
      .length;
  }, [testResults]);

  const hasTestedFeature = React.useCallback(
    (feature: IOSFeature) => {
      return Boolean(testResults[feature]);
    },
    [testResults]
  );

  const clearResults = React.useCallback(() => {
    setTestResults({});
  }, []);

  const value = React.useMemo(
    () => ({
      testResults,
      addTestResult,
      getTestCount,
      getSuccessCount,
      getFailedCount,
      hasTestedFeature,
      clearResults,
    }),
    [testResults, addTestResult, getTestCount, getSuccessCount, getFailedCount, hasTestedFeature, clearResults]
  );

  return <IOSTestContext.Provider value={value}>{children}</IOSTestContext.Provider>;
}

export function useIOSTest() {
  const context = React.useContext(IOSTestContext);
  if (context === undefined) {
    throw new Error('useIOSTest must be used within an IOSTestProvider');
  }
  return context;
}
