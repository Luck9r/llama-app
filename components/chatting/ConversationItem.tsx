import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { TabNavigatorParamList } from "@/app/navigatorParams";
import IconButton from "@/components/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";

export type Conversation = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type ConversationItemProps = {
  conversation: Conversation;
};

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();

  const deleteConversation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/conversation/${conversation.id}`,
        config,
      );
    } catch (error: any) {
      alert("Error\n" + error.message);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatScreen", { conversationId: conversation.id })
        }
        className="bg-slate-800 p-4 my-2 mx-4 rounded-lg flex-1 flex-row justify-between"
      >
        <View>
          <Text className="text-white text-lg font-bold">
            {conversation.name}
          </Text>
          <Text className="text-gray-400">
            {moment(conversation.createdAt).format("DD-MM-YYYY HH:mm")}
          </Text>
          <Text className="text-gray-300">
            {moment(conversation.updatedAt).format("DD-MM-YYYY HH:mm")}
          </Text>
        </View>
        <View className="flex-0 flex-row items-center">
          <IconButton
            className="p-3 rounded-lg "
            name="trash"
            onPress={deleteConversation}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ConversationItem;
