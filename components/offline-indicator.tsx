/**
 * Offline Indicator Component
 * Shows when the app is in offline mode
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useNetwork } from '@/lib/network-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function OfflineIndicator() {
  const { isOnline } = useNetwork();

  if (isOnline) {
    return null;
  }

  return (
    <View className="bg-warning px-4 py-2 flex-row items-center gap-2">
      <MaterialIcons name="wifi-off" size={16} color="#ffffff" />
      <Text className="text-white text-sm font-medium">
        Offline Mode - Using cached data
      </Text>
    </View>
  );
}
