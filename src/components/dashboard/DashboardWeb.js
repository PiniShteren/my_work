import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import Background from '../../elements/Background';
import Logo from '../../elements/Logo';
import Header from '../../elements/Header';
import TextInput from '../../elements/TextInput';
import Button from '../../elements/Button';
import { useTheme } from 'react-native-paper';
import { setLoading } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavWeb from './NavWeb';
import { useLocation } from 'react-router-native';
import HomeDashboard from './HomeDashboard';
import HomeEmploys from '../employs/HomeEmploys';
import TasksMain from '../tasks/TasksMain';
import PopupMessage from '../../elements/PopupMessage';

export default function DashboardWeb({ }) {

    const navigation = useLocation();

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const dispatch = useDispatch();
    const popupMessage = useSelector(state => state.popupMessage.object);

    const currentPage = (navigation) => {
        switch (navigation) {
            case "/users":
                return (
                    <HomeDashboard />
                )
            case "/":
                return (
                    <HomeEmploys />
                )
            case "/tasks":
                return (
                    <TasksMain />
                )

        }
    }

    return (
        <Background>
            <View style={styles.main}>
                <NavWeb />
                <View style={styles.conrainer}>
                    {currentPage(navigation.pathname)}
                </View>
            </View>
            {popupMessage && <PopupMessage
                isError={popupMessage?.isError}
                body={popupMessage?.body}
                title={popupMessage?.title}
            />}
        </Background>
    )
}

const stylesR = (colors) => StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "row",
        fontFamily: "Helvetica"
    },
    conrainer: {
        width: "93.5vw",
        marginRight: "1.5vw",
        marginVertical: "2vh",
        borderRadius: "6vh",
        height: "96vh",
        padding: "1.5vw",
    }
})