import React, { memo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Checkbox = ({ flag, dark, onPress }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);
    return (
        <Pressable onPress={() => onPress()} style={styles.outline}>
            {flag && <View style={styles.checkbox} />}
        </Pressable>
    )
};

const stylesR = (colors) => StyleSheet.create({
    outline: {
        width: "1.5vw",
        height: "1.5vw",
        border: `0.1vw solid ${colors.color3}`,
        backgroundColor: colors.backgroundSections,
        borderRadius: "0.3vw",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "1.5vw"
    },
    checkbox: {
        width: "1vw",
        height: "1vw",
        backgroundColor: colors.color2,
        borderRadius: "0.3vw",
    }
});

export default memo(Checkbox);