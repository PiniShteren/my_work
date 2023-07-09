import React, { memo, useRef, useEffect } from 'react';
import { View, Pressable, StyleSheet, Animated } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import TextCustomize from './TextCustomize';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPopupMessage } from '../redux/actions';

const PopupMessage = ({ isError, title, body }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();
    const styles = stylesR(colors);
    const dispatch = useDispatch();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            handleClose();
            setTimeout(() => dispatch(setPopupMessage(false)), 3000);
        }, 5000);
    }, []);

    const handleClose = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.popupView, { opacity: fadeAnim }]}>
            <TouchableOpacity
                onPress={() => handleClose()}
                style={styles.btnClose}
            >
                <AntDesign name="close" style={styles.iconClose} />
            </TouchableOpacity>
            <AntDesign name={isError ? "closecircle" : "checkcircle"} style={styles.icon(isError)} />
            <View>
                <TextCustomize styleText={styles.titleText(isError)}>{title}</TextCustomize>
                <TextCustomize styleText={styles.bodyText}>{body}</TextCustomize>
            </View>
        </Animated.View>
    )
};
const stylesR = (colors) => StyleSheet.create({
    popupView: {
        position: 'absolute',
        bottom: "2vw",
        left: "2vw",
        zIndex: 1000,
        shadowColor: colors.text,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        paddingRight: "2vw",
        paddingLeft: "1vw",
        paddingVertical: "1vw",
        backgroundColor: colors.background,
        flexDirection: "row",
        borderRadius: "0.3vw",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: (flag) => ({
        color: flag ? colors.error : colors.permission2,
        fontSize: "2vw",
        marginRight: "0.5vw"
    }),
    btnClose: {
        position: "absolute",
        top: "0.3vw",
        right: "0.3vw",
    },
    iconClose: {
        color: colors.text,
        fontSize: "1vw"
    },
    titleText: (flag) => ({
        fontSize: "1vw",
        fontWeight: "600",
        lineHeight: "1.5vw",
        color: flag ? colors.error : colors.permission2,
    }),
    bodyText: {
        fontSize: "0.8vw",
        lineHeight: "1.5vw",
    }
});
export default memo(PopupMessage);