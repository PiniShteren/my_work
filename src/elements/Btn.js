import React, { memo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
const Btn = ({ animation, style, ...props }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);
    return (
        <Pressable
            style={({ hovered, pressed }) => [style, pressed && { opacity: 0.8 }, hovered && !pressed && animation && { transform: [{ scale: 1.01 }] }]}
            {...props}
        >
            {props.children}
        </Pressable>
    )
};
const stylesR = (colors) => StyleSheet.create({
});
export default memo(Btn);