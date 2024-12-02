import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeWindStyleSheet } from 'nativewind';
import { AuthProvider } from '../contexts/AuthContext';
import AppNavigator from '../navigation/AppNavigator';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Index() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}