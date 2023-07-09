import React, { memo } from 'react';
import { View, StyleSheet, TextInput as Input } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import TextCustomize from './TextCustomize';
import { useState } from 'react';
import { useEffect } from 'react';
import Tooltip from './Tooltip';

const TextInput = ({ errorText, labelStyle, inputStyle, labelFlag, inputContainer, ...props }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);
    const [focus, setFocus] = useState(false);
    return (
        <View style={inputContainer}>
            <TextCustomize styleText={labelStyle}>{props.label}</TextCustomize>
            <Tooltip open={errorText} focus={focus} labelFlag={labelFlag}>
                <Input
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    style={[inputStyle, {borderRadius: "1.3vw"}]}
                    onChangeText={props.onChangeText}
                    {...props}
                /></Tooltip>
        </View>
    )
};

const stylesR = (colors) => StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: "0.2vw",
    },
    error: {
        fontSize: 14,
        color: colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
});

export default memo(TextInput);