import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export function HomeScreen({ navigation }: { navigation: any }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    return (
      <View className="flex-1 p-5 justify-center">
        <Text className="text-xl mb-2">Name:</Text>
        <TextInput
          className="border border-gray-300 p-3 mb-5 rounded"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <Text className="text-xl mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 p-3 mb-5 rounded"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Button
          title="Submit"
          onPress={() => navigation.navigate('Details', {name, email})}
        />
      </View>
    )
  }