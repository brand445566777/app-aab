import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#E74C3C', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 20 }}>
        🇵🇰 HELLO PAKISTAN HELPLINE!\n\nHomeScreen Render is Working!
      </Text>
    </View>
  );
}
