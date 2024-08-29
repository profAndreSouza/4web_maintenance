import { Button, Text, TextInput, View } from "react-native";
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
      />
    </View>
  )
}


export default function Index() {
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
      />
    </View>
  );
}
