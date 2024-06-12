import React from "react";
import { SafeAreaView, FlatList, Text, TouchableOpacity } from "react-native";
import ConversationItem, {
  Conversation,
} from "@/components/chatting/ConversationItem";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabNavigatorParamList } from "@/app/navigatorParams";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const HistoryScreen: React.FC = () => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();
  React.useEffect(() => {
    const fetchConversations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        };
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}conversation`,
          config,
        );
        setConversations(response.data);
      } catch (error: any) {
        alert("Error\n" + error.message);
      }
    };
    fetchConversations().then();
  }, []);

  return (
    <SafeAreaView className="bg-slate-700 flex-1">
      <Text className="text-white mt-2 text-2xl font-bold p-4">
        Chat History
      </Text>
      <TouchableOpacity
        className="bg-blue-500 p-3 my-2 rounded-lg items-center ml-4 mr-4"
        onPress={() =>
          navigation.navigate("ChatScreen", { conversationId: -1 })
        }
      >
        <Text className="text-white text-lg font-bold">New Chat</Text>
      </TouchableOpacity>
      <FlatList
        className="pl-4 pr-4"
        data={conversations}
        renderItem={({ item }) => <ConversationItem conversation={item} />}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;
