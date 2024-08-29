import { Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { styled } from 'nativewind';

type RootStackParamList = {
  Home: undefined;
  Details: {name: string; email: string};
};

const Stack = createStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 p-5 justify-center">
      <Text className="text-xl mb-2">Name:</Text>
      <TextInput
        className="border border-gray-300 p-3 mb-5 rounded"
        placeholder="Enter your name"
      />
      <Text className="text-xl mb-2">Email</Text>
      <TextInput
        className="border border-gray-300 p-3 mb-5 rounded"
        placeholder="Enter your email"
      />
      <Button
        title="Submit"
        onPress={() => navigation.navigate('Details', {})}
      />
    </View>
  )
}

function DetailsScreen({ route }: { route: any }) {
  const {name, email } = route.params;
  return (
    <View>
      <Text className="text-xl mb-2">Name:</Text>
      <Text className="text-lg mb-5">{name}</Text>

      <Text className="text-xl mb-2">Email:</Text>
      <Text className="text-lg mb-5">{email}</Text>
    </View>
  );
}

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
