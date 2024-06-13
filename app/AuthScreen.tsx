import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootNavigatorParamList } from "@/app/navigatorParams";

const AuthScreen = () => {
  const navigation = useNavigation<NavigationProp<RootNavigatorParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        {
          email: username,
          password,
        },
      );
      await AsyncStorage.setItem("token", response.data.access_token);
      await AsyncStorage.setItem(
        "userId",
        JSON.stringify(response.data.userId),
      );
      navigation.navigate("(tabs)");
    } catch (error: any) {
      alert("Error\n" + error.message);
    }
  };

  return (
    <SafeAreaView className="bg-slate-700 flex-1 justify-center items-center">
      <View className="bg-slate-800 p-4 rounded-lg w-4/5">
        <Text className="text-white text-2xl font-bold mb-4">Login</Text>
        <TextInput
          className="bg-slate-900 p-2 rounded-lg my-2 w-full text-white"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className="bg-slate-900 p-2 rounded-lg my-2 w-full text-white"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity
          className="bg-blue-500 p-3 my-2 rounded-lg items-center"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
