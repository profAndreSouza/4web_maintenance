import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import AppNavigator from '../navigation/AppNavigator';

export default function Index() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
