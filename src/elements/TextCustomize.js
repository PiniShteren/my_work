import React, { memo } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const TextCustomize = ({ styleText, children, number, ...props }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);
    return (
        <Text style={[styles.text, styleText]} numberOfLines={number ? 1 : ""}>{children}</Text>
    )
};
const stylesR = (colors) => StyleSheet.create({
    text: {
        fontFamily: "myFont",
    }
});
export default memo(TextCustomize);