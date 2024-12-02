import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  MachineDetails: { id: string };
  MaintenanceRequest: { machineId: string };
};

// Tipo para a rota MaintenanceRequest
export type MaintenanceRequestScreenRouteProp = RouteProp<RootStackParamList, 'MaintenanceRequest'>;
