import ChatInputField from "@/components/chatting/ChatInputField";
import { Animated, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import ChatMessage from "@/components/chatting/ChatMessage";
import ScrollView = Animated.ScrollView;

type Message = {
  message: string;
  user: boolean;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, onChangeInputText] = React.useState("");
  const sendMessage = () => {
    setMessages([...messages, { message: inputText, user: true }]);
    onChangeInputText("");
    // add a test response
    setTimeout(() => {
      setMessages([
        ...messages,
        { message: inputText, user: true },
        { message: "This is a test response", user: false },
      ]);
    }, 1000);
  };
  return (
    <SafeAreaView className="bg-slate-700 flex-1">
      <ScrollView
        automaticallyAdjustContentInsets={true}
        contentContainerStyle={styles.container}
      >
        <View style={styles.messageBox}>
          {messages.map((message: Message, index) => {
            return (
              <ChatMessage
                key={index}
                style={message.user ? styles.userMessage : styles.botMessage}
                message={message.message}
              />
            );
          })}
        </View>
        <ChatInputField
          style={styles.inputField}
          onPress={sendMessage}
          onChangeText={onChangeInputText}
          text={inputText}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  // background: {
  //   backgroundColor: Colors.dark.background,
  //   flex: 1,
  // },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.dark.messageBackgroundUser,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.dark.messageBackgroundBot,
  },
  messageBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 10,
  },
  inputField: {
    padding: 5,
    // height: 50,
    flex: 0,
  },
});
