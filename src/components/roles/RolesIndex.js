import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Modal from '../../elements/Modal';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import AddRole from './AddRole';
import TextCustomize from '../../elements/TextCustomize';
import Btn from '../../elements/Btn';
import AssignRoles from './AssignRoles';

const RolesIndex = ({ setFlag }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);

    const dispatch = useDispatch();

    const department = useSelector(state => state.rolesState.departments);
    const emploees = useSelector(state => state.usersState.users);

    const [departmentsState, setDepartmentsState] = useState([]);
    const [emploeesState, setemploeesState] = useState([]);
    const [screenType, setScreenType] = useState("add");


    useEffect(() => {
        setDepartmentsState([...department]);
    }, [department]);

    useEffect(() => {
        setemploeesState(emploees);
    }, [emploees]);

    const screen = () => {
        switch (screenType) {
            case "add":
                return (<AddRole
                    departments={departmentsState}
                />);
            case "assign":
                return (
                    <AssignRoles
                        emploees={emploeesState}
                        departments={departmentsState}
                    />
                )
        }
    }


    return (
        <Modal
            header={"תפקידים/קטגוריות"}
            setFlag={setFlag}
            icon={<MaterialIcons name="category" style={styles.bntAddIcon} />}
        >
            <View style={styles.navView}>
                <Btn animation={false} onPress={() => setScreenType("assign")} style={styles.navBtn(screenType === "assign")}>
                    <TextCustomize styleText={styles.navText}>הגדרת תפקידים לעובדים</TextCustomize>
                </Btn>
                <Btn animation={false} onPress={() => setScreenType("add")} style={styles.navBtn(screenType === "add")}>
                    <TextCustomize styleText={styles.navText}>הוספת תפקיד/קטגוריה</TextCustomize>
                </Btn>
            </View>
            {screen()}
        </Modal>
    )
};
const stylesR = (colors) => StyleSheet.create({
    navView: {
        width: '100%',
        flexDirection: "row",
    },
    navBtn: (flag) => ({
        backgroundColor: `${colors.color1}${flag ? "b0" : ""}`,
        flex: 1,
        alignItems: "center",
        paddingVertical: "0.5vw"
    }),
    bntAddIcon: {
        fontSize: "1.2vw",
        paddingRight: "0.5vw",
        alignSelf: "center",
        color: colors.backgroundSections
    },
    navText: {
        color: colors.background
    }
});
export default memo(RolesIndex);