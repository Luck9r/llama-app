import React from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import IconButton from "@/components/IconButton";

type Props = {
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  className?: string;
  text: string;
  disabled: boolean;
};

export default function ChatInputField({
  onPress,
  onChangeText,
  className,
  text,
  disabled,
}: Props) {
  return (
    <KeyboardAvoidingView className="w-full" behavior="padding">
      <View
        className={`flex flex-row items-center p-2 bg-slate-800 rounded-lg m-2 ${className}`}
      >
        <TextInput
          className="flex-1 text-white p-3 bg-slate-800 rounded-l-lg"
          onChangeText={onChangeText}
          id="chatInput"
          placeholder="Type a message..."
          value={text}
          editable={!disabled}
        />
        <IconButton
          className={
            disabled ? "p-3 rounded-lg text-gray-600" : "p-3 rounded-lg"
          }
          name="paper-plane"
          onPress={disabled ? undefined : onPress}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
