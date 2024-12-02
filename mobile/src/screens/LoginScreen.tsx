import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch {
      setError('Erro ao autenticar');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-xl font-bold mb-4">Login</Text>
      <TextInput
        className="border border-gray-300 p-2 w-3/4 rounded mb-2"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-300 p-2 w-3/4 rounded mb-4"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text className="text-red-500">{error}</Text>}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
