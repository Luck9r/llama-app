import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, ScrollView, RefreshControl } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatInputField from "@/components/chatting/ChatInputField";
import ChatMessage, { Message } from "@/components/chatting/ChatMessage";
import { TabNavigatorParamList } from "@/app/navigatorParams";
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as constants from "@/constants";

const ChatScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendDisabled, setSendDisabled] = useState(false);
  const [inputText, setInputText] = useState("");
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();
  const route = useRoute<RouteProp<TabNavigatorParamList, "ChatScreen">>();
  const { conversationId } = route.params;
  const [refreshingChat, setRefreshingChat] = useState(false);

  useEffect(() => {
    if (conversationId === -1) {
      setMessages([]);
    }
  }, [conversationId]);

  const sendMessage = useCallback(async () => {
    if (inputText === "") return;
    setSendDisabled(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        conversationId !== -1
          ? `${constants.API_URL}/llama/${conversationId}`
          : `${constants.API_URL}/llama`,
        {
          message: inputText,
          userId: await AsyncStorage.getItem("userId"),
          conversationId: conversationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (conversationId === -1) {
        navigation.navigate("ChatScreen", {
          conversationId: response.data.conversationId,
        });
      }
      setInputText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
    setSendDisabled(false);
  }, [inputText, conversationId, navigation]);

  const fetchMessages = async () => {
    if (conversationId === -1) return;
    setRefreshingChat(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${constants.API_URL}/message/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessages(response.data);
    } catch (error: any) {
      alert("Conversation not found!\nMaybe you deleted it?\n" + error.message);
      navigation.navigate("ChatScreen", { conversationId: -1 });
    }
    setRefreshingChat(false);
  };

  useEffect(() => {
    fetchMessages().then();
  }, [conversationId, isFocused, sendMessage]);

  return (
    <SafeAreaView className="bg-slate-700 flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
        automaticallyAdjustContentInsets={true}
      >
        <RefreshControl refreshing={refreshingChat} onRefresh={fetchMessages} />
        <View className="flex-1 flex-col justify-end p-3">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              sender={message.sender}
            />
          ))}
        </View>
      </ScrollView>
      <ChatInputField
        className="flex-0"
        onPress={sendMessage}
        onChangeText={setInputText}
        text={inputText}
        disabled={sendDisabled}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
