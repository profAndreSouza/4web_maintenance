import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

// Tipos de navegação e rota
type MachineDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MachineDetails'>;
type MachineDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MachineDetails'>;

export const MachineDetailsScreen: React.FC = () => {
  const route = useRoute<MachineDetailsScreenRouteProp>();
  const navigation = useNavigation<MachineDetailsScreenNavigationProp>();
  const { id } = route.params;

  // Dados fictícios (substitua por chamadas de API)
  const machineDetails = {
    id: id,
    name: 'Máquina A',
    type: 'Tipo 1',
    location: 'Setor 1',
    model: 'Modelo XYZ',
    serialNumber: '12345ABC',
    manufactureDate: '01/01/2020',
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Detalhes da Máquina</Text>
      <View className="bg-white rounded-lg shadow p-4 mb-4">
        <Text className="text-lg font-semibold text-gray-800">Nome: {machineDetails.name}</Text>
        <Text className="text-gray-600">Tipo: {machineDetails.type}</Text>
        <Text className="text-gray-600">Localização: {machineDetails.location}</Text>
        <Text className="text-gray-600">Modelo: {machineDetails.model}</Text>
        <Text className="text-gray-600">Número de Série: {machineDetails.serialNumber}</Text>
        <Text className="text-gray-600">Data de Fabricação: {machineDetails.manufactureDate}</Text>
      </View>
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-4 mb-2"
        onPress={() => navigation.navigate('MaintenanceRequest', { machineId: id })}
      >
        <Text className="text-center text-white font-semibold">Solicitar Manutenção</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-200 rounded-lg p-4"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center text-gray-800 font-semibold">Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MachineDetailsScreen;
