import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { TabNavigatorParamList } from "@/app/navigatorParams";

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

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatScreen", { conversationId: conversation.id })
      }
      className="bg-slate-800 p-4 my-2 rounded-lg"
    >
      <Text className="text-white text-lg font-bold">{conversation.name}</Text>
      <Text className="text-gray-400">{conversation.createdAt}</Text>
      <Text className="text-gray-300">{conversation.updatedAt}</Text>
    </TouchableOpacity>
  );
};

export default ConversationItem;
