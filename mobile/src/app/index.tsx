import { Button, Text, TextInput, View } from "react-native";
import { styled } from 'nativewind';

export default function Index() {
  return (
    <View className="flex-1 p-5 justify-center">
      <Text>Name:</Text>
      <TextInput
        placeholder="Enter your name"      
      />
      <Text>Email</Text>
      <TextInput 
        placeholder="Enter your email"
      />
      <Button
        title="Submit"
      />
    </View>
  );
}
