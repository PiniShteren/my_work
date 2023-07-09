import { Text, useTheme } from 'react-native-paper'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

export default function TasksMain() {

    const { colors } = useTheme();
    const styles = stylesR(colors);

 
    return (
        <View style={styles.container}>
        </View>
    )
}

const stylesR = (colors) => StyleSheet.create({
    container: {
        writingDirection: "rtl",
        alignItems: "center"
    },
    header: {
        writingDirection: "rtl",
    }
});
