import {TouchableHighlight, View} from "react-native";
import React, {type ComponentProps} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import type {IconProps} from "@expo/vector-icons/build/createIconSet";

export default function IconButton({ style, onPress, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
    return (
        <TouchableHighlight onPress={onPress} style={style}>
            <View>
                <Ionicons size={28} style={style} {...rest} />
            </View>
        </TouchableHighlight>
    )
}
