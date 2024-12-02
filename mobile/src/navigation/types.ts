import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    MachineDetails: { id: string };
    MaintenanceRequest: { machineId: string };
  };

export type MaintenanceRequestScreenRouteProp = RouteProp<RootStackParamList, 'MaintenanceRequest'>;