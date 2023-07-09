import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useContext, useState, useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { setLoading, setEditUser, setRolesFlag } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import DashboardWeb from './DashboardWeb';
import DashboardMobile from './DahsboardMobile';
import UserEdit from "../employs/UserEdit";
import RolesIndex from '../roles/RolesIndex';

export default function DashboardIndex({ navigation }) {

    const { colors } = useTheme();
    const styles = stylesR(colors);
    const userCurrent = useSelector(state => state.usersState.userEdit);
    const userFlag = useSelector(state => state.usersState.flag);
    const rolesFlag = useSelector(state => state.rolesState.flag);
    const isNew = useSelector(state => state.usersState.isNew);

    const dispatch = useDispatch();
    const [userCurrentState, setUserCurrentState] = useState(false);

    useEffect(() => {
        setUserCurrentState(userCurrent);
    }, [userCurrent]);

    return (
        <>
            {Platform.OS === "web" ?
                <DashboardWeb /> :
                <DashboardMobile />
            }
            {userFlag &&
                <UserEdit
                    flag={userFlag}
                    user={userCurrentState}
                    isnNew={isNew}
                    setFlag={() => dispatch(setEditUser())}
                />}
            {rolesFlag &&
                <RolesIndex
                    setFlag={() => dispatch(setRolesFlag(false))}
                />
            }
        </>
    )
}

const stylesR = (colors) => StyleSheet.create({

})