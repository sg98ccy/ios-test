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

interface TestResult {
  feature: IOSFeature;
  status: 'success' | 'failed' | 'partial';
  timestamp: number;
}

interface IOSTestContextType {
  testResults: TestResult[];
  addTestResult: (feature: IOSFeature, status: 'success' | 'failed' | 'partial') => void;
  getTestCount: () => number;
  getSuccessCount: () => number;
  getFailedCount: () => number;
  hasTestedFeature: (feature: IOSFeature) => boolean;
  clearResults: () => void;
}

const IOSTestContext = React.createContext<IOSTestContextType | undefined>(undefined);

export function IOSTestProvider({ children }: { children: React.ReactNode }) {
  const [testResults, setTestResults] = React.useState<TestResult[]>([]);

  const addTestResult = React.useCallback(
    (feature: IOSFeature, status: 'success' | 'failed' | 'partial') => {
      setTestResults((prev) => [
        ...prev,
        {
          feature,
          status,
          timestamp: Date.now(),
        },
      ]);
    },
    []
  );

  const getTestCount = React.useCallback(() => {
    return testResults.length;
  }, [testResults]);

  const getSuccessCount = React.useCallback(() => {
    return testResults.filter((result) => result.status === 'success').length;
  }, [testResults]);

  const getFailedCount = React.useCallback(() => {
    return testResults.filter((result) => result.status === 'failed').length;
  }, [testResults]);

  const hasTestedFeature = React.useCallback(
    (feature: IOSFeature) => {
      return testResults.some((result) => result.feature === feature);
    },
    [testResults]
  );

  const clearResults = React.useCallback(() => {
    setTestResults([]);
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
