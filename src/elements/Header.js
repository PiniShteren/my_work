import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Header = ({ children, center, color }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);
    return (
        <Text style={styles.header(center, color)}>{children}</Text>
    )
};

const stylesR = (colors) => StyleSheet.create({
    header: (center, color) => ({
        fontSize: 26,
        color: color ? color : colors.text,
        fontWeight: 'bold',
        marginVertical: "1vw",
        textAlign: center ? "center" : "end",
    }),
});

export default memo(Header);