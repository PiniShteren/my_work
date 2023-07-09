import React, { memo } from 'react';
import { View } from 'react-native';
import {
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
} from 'react-native';

import { Text, useTheme } from 'react-native-paper';

const Background = ({ children }) => {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    return (
        <ImageBackground
            resizeMode="repeat"
            style={styles.background}
        >
            {children}
        </ImageBackground>
    );
}

const stylesR = (colors) => StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.background,
    },
});

export default memo(Background);