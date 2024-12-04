import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { machines } from '../services/machines'; // Importando os dados das máquinas
import { useAuth } from '../contexts/AuthContext';

// Tipos para navegação
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleMachinePress = (machineId: string) => {
    navigation.navigate('MachineDetails', { id: machineId });
  };

  const { user } = useAuth();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Lista de Máquinas</Text>
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 bg-white rounded-lg mb-4 shadow-md"
            onPress={() => handleMachinePress(item.id)}
          >
            <Text className="text-lg font-semibold text-gray-800">{user}</Text>
            <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
            <Text className="text-gray-600">{item.type}</Text>
            <Text className="text-gray-600">{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
