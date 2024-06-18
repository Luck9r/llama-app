import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { TabNavigatorParamList } from "@/app/navigatorParams";
import IconButton from "@/components/IconButton";
import moment from "moment";

export type Conversation = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type ConversationItemProps = {
  conversation: Conversation;
  onTrashPress: () => void;
};

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onTrashPress,
}) => {
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatScreen", { conversationId: conversation.id })
      }
      className="bg-slate-800 p-4 my-2 mx-4 rounded-lg flex-1 flex-row justify-between flex-wrap"
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
          className="p-3 rounded-lg flex-wrap"
          name="trash"
          onPress={onTrashPress}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ConversationItem;
