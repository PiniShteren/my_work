import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import TextCustomize from './TextCustomize';

const Modal = ({ flag, children, setFlag, header, icon }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);

    return (
        <Animated.View style={{
            zIndex: 10,
            position: "absolute",
            width: "100%",
            height: "100vh"
        }}>
            <View style={styles.container}>
                <View style={styles.main}>
                    {/* close btn */}
                    <TouchableOpacity style={styles.btn}
                        onPress={() => {
                            setFlag();
                        }}
                    >
                        <MaterialCommunityIcons name="close" style={styles.closeIcon} />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        {/* header */}
                        {icon && icon}
                        <TextCustomize styleText={styles.headerText}>{header}</TextCustomize>
                    </View>
                    {children}
                </View>
            </View>
        </Animated.View>
    )
};
const stylesR = (colors) => StyleSheet.create({
    container: {
        width: '100%',
        height: "100vh",
        backgroundColor: "#0000002b",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    main: {
        width: "50vw",
        height: "80vh",
        boxShadow: "0 0 5 black",
        backgroundColor: colors.backgroundSections,
        alignItems: "center",
        borderRadius: "2vw",
    },
    header: {
        width: "100%",
        alignItems: "center",
        backgroundColor: colors.color1,
        borderTopLeftRadius: "2vw",
        borderTopRightRadius: "2vw",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        position: "absolute",
        top: "1vw",
        right: "1.1vw",
        zIndex: 10
    },
    closeIcon: {
        fontSize: "1.2vw",
        fontWeight: "500",
        color: colors.background
    },
    headerText: {
        fontSize: "1.2vw",
        marginVertical: "1.2vw",
        color: colors.background
    },
});
export default memo(Modal);