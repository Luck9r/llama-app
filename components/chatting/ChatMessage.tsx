import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
  message: string;
};

export default function ChatMessage({ style, message }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.message, style]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    margin: 5,
  },
  message: {},
});
