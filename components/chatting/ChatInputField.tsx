import React from 'react';
import {KeyboardAvoidingView, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {Colors} from "@/constants/Colors";
import IconButton from "@/components/IconButton";

type Props = {
    style?: ViewStyle;
}
export default function ChatInputField( { style }: Props) {
    const [text, onChangeText] = React.useState('');
    // const [number, onChangeNumber] = React.useState('');

    return (
        <KeyboardAvoidingView style={styles.container} behavior={"padding"} keyboardVerticalOffset={60}>
            <View style={[styles.field, style]}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    id={"chatInput"}
                    placeholder={"Type a message..."}
                    value={text}
                />
                <IconButton style={styles.sendButton} name={'paper-plane'} onPress={() => {console.log("E");}}> </IconButton>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    field: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        backgroundColor: Colors.dark.background,
        borderColor: Colors.dark.tint,
        borderWidth: 2,
        borderCurve: "circular",
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    textInput: {
        color: Colors.dark.text,
        padding: 20,
        flex: 1,
        alignSelf: "stretch",
    },
    sendButton: {
        color: Colors.dark.text,
        backgroundColor: Colors.dark.background,
        alignSelf: "flex-end",
        padding: 5,
        paddingTop: 7,
    }
})
