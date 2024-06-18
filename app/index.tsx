import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootNavigatorParamList } from "@/app/navigatorParams";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useAuth } from "@/hooks/useAuth";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootNavigatorParamList>>();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };
  React.useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setIsLoggedIn(true);
      }
    });
  }, []);
  return (
    <SafeAreaView className="bg-slate-700 flex-1 justify-center items-center">
      {isLoggedIn ? (
        <>
          <Text className="text-white text-2xl font-bold">
            Welcome to the LLAMA chat!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("(tabs)")}
            className="bg-blue-500 p-3 my-2 rounded-lg"
          >
            <Text className="text-white text-lg font-bold">Go to Chat</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-white text-2xl font-bold">
            Please log in to proceed
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AuthScreen")}
            className="bg-blue-500 p-3 my-2 rounded-lg"
          >
            <Text className="text-white text-lg font-bold">Login</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}
