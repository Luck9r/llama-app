import React from "react";
import { Text, View } from "react-native";

type Props = {
  message: string;
  className?: string;
  sender: boolean;
};

export type Message = {
  text: string;
  sender: boolean;
};

export default function ChatMessage({ message, className, sender }: Props) {
  return (
    <View
      className={
        sender
          ? "justify-self-start bg-indigo-400 rounded-lg m-2 p-3"
          : " bg-indigo-200 rounded-lg m-2 p-3 me-auto"
      }
      style={{ alignSelf: sender ? "flex-start" : "flex-end" }}
    >
      <Text className={className + ""}>{message}</Text>
    </View>
  );
}
