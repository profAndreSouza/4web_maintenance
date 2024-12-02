import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { tw } from 'nativewind';

// Dados fictícios para exibição
const machines = [
  { id: '1', name: 'Máquina A', type: 'Tipo 1', location: 'Setor 1' },
  { id: '2', name: 'Máquina B', type: 'Tipo 2', location: 'Setor 2' },
  { id: '3', name: 'Máquina C', type: 'Tipo 3', location: 'Setor 3' },
];

// Tipos para navegação
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleMachinePress = (machineId: string) => {
    navigation.navigate('MachineDetails', { id: machineId });
  };

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Lista de Máquinas</Text>
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`p-4 bg-white rounded-lg mb-2 shadow`}
            onPress={() => handleMachinePress(item.id)}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>{item.name}</Text>
            <Text style={tw`text-gray-600`}>{item.type}</Text>
            <Text style={tw`text-gray-600`}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
