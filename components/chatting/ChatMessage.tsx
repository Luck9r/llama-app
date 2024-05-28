import React from "react";
import { Text, View } from "react-native";

type Props = {
  message: string;
  className?: string;
  user: boolean;
};

export default function ChatMessage({ message, className, user }: Props) {
  return (
    <View
      className={
        user
          ? " bg-indigo-200 rounded-lg m-2 p-3 me-auto"
          : "justify-self-start bg-indigo-400 rounded-lg m-2 p-3"
      }
      style={{ alignSelf: user ? "flex-end" : "flex-start" }}
    >
      <Text className={className + ""}>{message}</Text>
    </View>
  );
}
