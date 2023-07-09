import React, { memo } from 'react';
import {
    StyleSheet
} from 'react-native';

import { useTheme } from 'react-native-paper';
import { Button as ButtonRN } from '@rneui/themed';

const Button = ({ mode, style, children, ...props }) => {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    return (
        <ButtonRN
            buttonStyle={styles.Button}
            containerStyle={styles.containerStyle}
            titleStyle={styles.titleStyle}
            {...props}
        />
    );
}

const stylesR = (colors) => StyleSheet.create({
    Button: {
        backgroundColor: colors.color1,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
    },
    containerStyle: {
        width: "18vw",
        marginHorizontal: 50,
        marginVertical: 10,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: "1vw",
        color: colors.background,
    }
});

export default memo(Button);