import React, { type ComponentProps } from "react";
import { TouchableHighlight, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled } from "nativewind";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

const StyledTouchableHighlight = styled(TouchableHighlight);
const StyledIonicons = styled(Ionicons);

export default function IconButton({
  className,
  onPress,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return (
    <StyledTouchableHighlight
      onPress={onPress}
      className={className + " rounded-lg"}
      underlayColor="rgba(0,0,0,0)"
    >
      <View>
        <StyledIonicons
          className={"text-white " + className}
          size={28}
          {...rest}
        />
      </View>
    </StyledTouchableHighlight>
  );
}
