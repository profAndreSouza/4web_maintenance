import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../contexts/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
