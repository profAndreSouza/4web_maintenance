import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useForm, Controller } from 'react-hook-form';

// Tipos de navegação e rota
type MaintenanceRequestScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MaintenanceRequest'>;
type MaintenanceRequestScreenRouteProp = RootStackParamList['MaintenanceRequest'];

// Estrutura dos dados do formulário
interface MaintenanceFormData {
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  responsible: string;
}

export const MaintenanceRequestScreen: React.FC = () => {
  const navigation = useNavigation<MaintenanceRequestScreenNavigationProp>();
  const route = useRoute<MaintenanceRequestScreenRouteProp>();
  const { machineId } = route.params;

  const { control, handleSubmit, reset } = useForm<MaintenanceFormData>({
    defaultValues: {
      description: '',
      priority: 'Média',
      responsible: '',
    },
  });

  const onSubmit = (data: MaintenanceFormData) => {
    console.log('Dados da solicitação:', {
      machineId,
      ...data,
    });
    // Lógica de envio para a API ou backend aqui
    reset();
    navigation.goBack();
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Solicitação de Manutenção</Text>

      <View className="mb-4">
        <Text className="text-gray-800 mb-2">Descrição do Problema:</Text>
        <Controller
          control={control}
          name="description"
          rules={{ required: 'A descrição é obrigatória' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white p-4 rounded-lg shadow"
              placeholder="Descreva o problema"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
        />
      </View>

      <View className="mb-4">
        <Text className="text-gray-800 mb-2">Prioridade:</Text>
        <Controller
          control={control}
          name="priority"
          render={({ field: { onChange, value } }) => (
            <View className="bg-white p-4 rounded-lg shadow">
              <TouchableOpacity
                className={`p-2 rounded mb-2 ${value === 'Baixa' ? 'bg-blue-100' : ''}`}
                onPress={() => onChange('Baixa')}
              >
                <Text className="text-gray-800">Baixa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`p-2 rounded mb-2 ${value === 'Média' ? 'bg-blue-100' : ''}`}
                onPress={() => onChange('Média')}
              >
                <Text className="text-gray-800">Média</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`p-2 rounded ${value === 'Alta' ? 'bg-blue-100' : ''}`}
                onPress={() => onChange('Alta')}
              >
                <Text className="text-gray-800">Alta</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View className="mb-4">
        <Text className="text-gray-800 mb-2">Responsável:</Text>
        <Controller
          control={control}
          name="responsible"
          rules={{ required: 'O responsável é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white p-4 rounded-lg shadow"
              placeholder="Nome do responsável"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-semibold">Enviar Solicitação</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-200 rounded-lg p-4 mt-2"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center text-gray-800 font-semibold">Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MaintenanceRequestScreen;
