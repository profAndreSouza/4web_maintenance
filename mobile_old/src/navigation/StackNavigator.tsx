import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MachineDetailsScreen from '../screens/MachineDetailsScreen';
import MaintenanceRequestScreen from '../screens/MaintenanceRequestScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MachineDetails" component={MachineDetailsScreen} />
        <Stack.Screen name="MaintenanceRequest" component={MaintenanceRequestScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
