import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from 'react-native-paper';
import { setLoading } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import ButtonNav from '../../elements/ButtonNav';
import {
    useLocation, useHistory, useNavigate
} from 'react-router-native';
import Logo from '../../elements/Logo';

export default function NavWeb({ }) {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const navigation = useLocation();

    const dispatch = useDispatch();

    const btn = [
        { icon: "home", path: "/" },
        { icon: "addusergroup", path: "/users" },
        { icon: "bars", path: "/tasks" },
    ]


    return (
        <View style={styles.container}>
            <View style={styles.styleBtn}>
                <Logo small={true} />
            </View>
            {btn.map((btn, i) => {
                return <ButtonNav
                    key={i}
                    icon={btn.icon}
                    navClick={btn.path}
                    active={btn.path === navigation.pathname}
                    styleBtn={styles.styleBtn}
                    styleIcon={btn.path !== navigation.pathname ? styles.styleIcon : styles.styleIconActive}
                />
            })}
        </View>
    )
}

const stylesR = (colors) => StyleSheet.create({
    container: {
        width: "5vw",
        height: "100vh",
        paddingVertical: "2vh",
        alignItems: "center",
        backgroundColor: colors.color1
    },
    styleBtn: {
        marginBottom: "2vw",
        alignItems: "center",
        justifyContent: "center",
    },
    styleIcon: {
        fontSize: "1.4vw",
        color: colors.iconLight
    },
    styleIconActive: {
        fontSize: "1.4vw",
        color: colors.color2
    }
})