import React, { useCallback } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Animated,
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
  const [animatedValues, setAnimatedValues] = React.useState<{
    [key: number]: Animated.Value;
  }>({});
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();
  const isFocused = navigation.isFocused();
  const [refreshingConversations, setRefreshingConversations] =
    React.useState(false);

  const initializeAnimatedValues = (conversations: Conversation[]) => {
    const values = conversations.reduce(
      (acc, conversation) => {
        acc[conversation.id] = new Animated.Value(1);
        return acc;
      },
      {} as { [key: number]: Animated.Value },
    );
    setAnimatedValues(values);
  };

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
      initializeAnimatedValues(response.data);
    } catch (error: any) {
      alert("Error\n" + error.message);
    }
    setRefreshingConversations(false);
  }, []);

  const deleteConversation = async (id: number) => {
    const animatedValue = animatedValues[id];
    if (animatedValue) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          };
          await axios.delete(`${constants.API_URL}/conversation/${id}`, config);
          setConversations((prevConversations) =>
            prevConversations.filter((conversation) => conversation.id !== id),
          );
          const newAnimatedValues = { ...animatedValues };
          delete newAnimatedValues[id];
          setAnimatedValues(newAnimatedValues);
        } catch (error: any) {
          alert("Error\n" + error.message);
        }
        console.log("Deleted conversation with id", id);
      });
    }
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
        {conversations.map((item) => {
          const animatedValue = animatedValues[item.id];
          return (
            <Animated.View
              key={item.id}
              style={{
                opacity: animatedValue,
                height: animatedValue
                  ? animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 115],
                    })
                  : 60,
                overflow: "hidden",
              }}
            >
              <ConversationItem
                conversation={item}
                onTrashPress={() => deleteConversation(item.id)}
              />
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
