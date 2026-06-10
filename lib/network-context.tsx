/**
 * Network Status Context
 * Tracks online/offline status using simple connectivity checks
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

interface NetworkContextType {
  isOnline: boolean;
  isConnected: boolean;
}

const NetworkContext = createContext<NetworkContextType>({
  isOnline: true,
  isConnected: true,
});

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check connectivity on app state change
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Initial check
    checkConnectivity();

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (state: AppStateStatus) => {
    if (state === 'active') {
      checkConnectivity();
    }
  };

  const checkConnectivity = async () => {
    try {
      // Simple connectivity check using fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch('https://www.google.com', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      setIsOnline(true);
      console.log('[Network] Connected');
    } catch (error) {
      setIsOnline(false);
      console.log('[Network] Offline');
    }
  };

  return (
    <NetworkContext.Provider value={{ isOnline, isConnected: isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
}

/**
 * Hook to use network status
 */
export function useNetwork(): NetworkContextType {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within NetworkProvider');
  }
  return context;
}
