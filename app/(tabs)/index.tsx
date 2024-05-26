import ChatInputField from "@/components/chatting/ChatInputField";
import {Animated, SafeAreaView, View} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import {StyleSheet} from "react-native";
import ChatMessage from "@/components/chatting/ChatMessage";
import ScrollView = Animated.ScrollView;

export default function ChatScreen() {
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView automaticallyAdjustContentInsets={true} contentContainerStyle={styles.container}>

                    <View style={styles.messageBox}>
                        <ChatMessage style={styles.userMessage} message='This is a test message'/>
                        <ChatMessage style={styles.botMessage} message='This is a test response'/>
                    </View>
                    <ChatInputField style={styles.inputField}/>
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
    background: {
        backgroundColor: Colors.dark.background,
        flex: 1,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.dark.messageBackgroundUser,
    },
    botMessage: {
        alignSelf: 'flex-start',
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
    }
});
