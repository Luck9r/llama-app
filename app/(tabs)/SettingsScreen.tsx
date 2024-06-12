import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootNavigatorParamList } from "@/app/navigatorParams";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootNavigatorParamList>>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error: any) {
      alert("Error\n" + error.message);
    }
    navigation.navigate("AuthScreen");
  };

  const handleConnectToBluetooth = () => {
    // TODO: Implement connect to bluetooth logic
    console.log("Connect to Bluetooth clicked");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-700 p-4">
      <Text className="text-white mt-2 text-2xl font-bold p-4">Settings</Text>
      <View className="space-y-4 p-3">
        <TouchableOpacity
          className="bg-slate-800 rounded-lg p-4"
          onPress={handleLogout}
        >
          <Text className="text-white text-center text-lg">Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-800 rounded-lg p-4"
          onPress={handleConnectToBluetooth}
        >
          <Text className="text-white text-center text-lg">
            Connect to Bluetooth Device
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
