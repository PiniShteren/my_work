import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Link } from "react-router-native"

export default function ButtonNav({ active, icon, styleBtn, styleIcon, navClick }) {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const dispatch = useDispatch();

    return (
        <Pressable>
            {({ hovered }) => (
                <Link style={styleBtn} to={navClick} underlayColor="transparent" >
                    <AntDesign name={icon} style={[hovered && !active && { filter: "drop-shadow(1px 1px 5px crimson)" }, styleIcon]} />
                </Link>
            )}
        </Pressable>
    )
}

const stylesR = (colors) => StyleSheet.create({

})