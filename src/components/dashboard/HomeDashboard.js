import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper';
import { setLoading } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { LoginContext } from '../../APIS/LoginAPI';
import DateAndTime from '../../elements/DateAndTime';

export default function HomeDashboard({ }) {


    const { colors } = useTheme();
    const styles = stylesR(colors);

    const dispatch = useDispatch();
    const { getUserBySession } = useContext(LoginContext);

    const user = useSelector(state => state.userDetails.user);

    const [userObject, setUserObject] = useState(false);

    useEffect(() => {
        if (!user) {
            dispatch(setLoading(true));
            getUserBySession(sessionStorage.getItem("session"))
                .then(() => {
                    dispatch(setLoading(false));
                }).catch(() => {
                    dispatch(setLoading(false));
                    sessionStorage.removeItem("session");
                })
        } else {
            setUserObject(user);
        }
    }, [user]);


    const details = (
        <View style={styles.top}>
            <View style={styles.name_view}>
                <Text style={styles.name}>שלום, {userObject?.username}</Text>
                <Text style={styles.role}> (מנהל משמרת)</Text>
            </View>
            <View>
                <DateAndTime />
            </View>
        </View>
    )

    return (
        <View style={styles.main}>
            {details}
        </View>
    )
}

const stylesR = (colors) => StyleSheet.create({
    main: {
        flex: 1,
    },
    top: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between"
    },
    name_view: {
        flexDirection: "row",
        writingDirection: "rtl",
        alignItems: "center"
    },
    name: {
        fontSize: "1.3vw",
        fontWeight: "700",
    },
    role: {
        fontSize: "1vw",
        fontWeight: "700",
        marginRight: "0.2vw",
        color: colors.color2
    }
})