import React, { useCallback } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import ConversationItem, {
  Conversation,
} from "@/components/chatting/ConversationItem";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabNavigatorParamList } from "@/app/navigatorParams";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as constants from "@/constants";

const HistoryScreen: React.FC = () => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();
  const isFocused = navigation.isFocused();
  const [refreshingConversations, setRefreshingConversations] =
    React.useState(false);
  const fetchConversations = useCallback(async () => {
    setRefreshingConversations(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      const response = await axios.get(
        `${constants.API_URL}/conversation`,
        config,
      );
      setConversations(response.data);
    } catch (error: any) {
      alert("Error\n" + error.message);
    }
    setRefreshingConversations(false);
  }, []);

  const deleteConversation = async (id: number) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      await axios.delete(`${constants.API_URL}/conversation/${id}`, config);
    } catch (error: any) {
      alert("Error\n" + error.message);
    }
    fetchConversations().then();
    console.log("Deleted conversation with id", id);
  };

  React.useEffect(() => {
    fetchConversations().then();
  }, [navigation, isFocused]);

  return (
    <SafeAreaView className="bg-slate-700 min-h-full">
      <Text className="text-white mt-2 text-2xl font-bold p-4">
        Chat History
      </Text>
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-lg items-center m-4"
        onPress={() =>
          navigation.navigate("ChatScreen", { conversationId: -1 })
        }
      >
        <Text className="text-white text-lg font-bold">New Chat</Text>
      </TouchableOpacity>
      <ScrollView className="flex-1" automaticallyAdjustContentInsets={true}>
        <RefreshControl
          refreshing={refreshingConversations}
          onRefresh={fetchConversations}
        />
        {conversations.map((item) => (
          <ConversationItem
            key={item.id}
            conversation={item}
            onTrashPress={() => deleteConversation(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
