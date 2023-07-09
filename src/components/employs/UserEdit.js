import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Modal from '../../elements/Modal';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setEditUser } from '../../redux/actions';
import Personal from './Personal';
import Salary from './Salary';
import Documents from './Documents';
import TasksUser from './TasksUser';

const UserEdit = ({ user, isnNew }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);

    const dispatch = useDispatch();

    const ifChanged = useRef(null);

    const navOptions = [
        { type: "personal" },
        { type: "salary" },
        { type: "documents" },
        { type: "tasks" },
    ];

    const [screen, setScreen] = useState(navOptions[0].type);
    const [ifChangedState, setIfChangedState] = useState();

    const returnNameAndFunc = (type) => {
        switch (type) {
            case "personal":
                return { name: "פרטים אישיים", icon: "account-box", onPress: () => setScreen(type) };
            case "salary":
                return { name: "שכר", icon: "alarm-panel-outline", onPress: () => setScreen(type) };
            case "documents":
                return { name: "מסמכים", icon: "file-document-multiple-outline", onPress: () => setScreen(type) };
            case "tasks":
                return { name: "משימות", icon: "view-list-outline", onPress: () => setScreen(type) };
        }
    };

    const Screens = (screen) => {
        switch (screen) {
            case "personal":
                return <Personal isNew={isnNew} setIfChangedState={setIfChangedState} userCurrent={user} ifChanged={ifChangedState} />;
            case "salary":
                return <Salary />
            case "documents":
                return <Documents />;
            case "tasks":
                return <TasksUser />
        }
    }

    const navOption = (onPress, text, index, iconName, type, screen) => (
        <TouchableOpacity key={index} style={styles.btnNav(screen === type)} onPress={() => {
            if (!ifChangedState) {
                onPress();
            }
        }}>
            <Text style={styles.textNav}>{text}</Text>
            <MaterialCommunityIcons name={iconName} style={styles.closeIcon} />
        </TouchableOpacity>
    );

    return (
        <Modal
            header={isnNew ? "הוסף עובד" : "פרטי עובד"}
            setFlag={() => dispatch(setEditUser(false))}
            icon={isnNew ? <MaterialIcons name="add" style={styles.bntAddIcon} /> : <AntDesign name="user" style={styles.bntAddIcon} />}
        >
            {/* main */}
            <View style={styles.main}>
                {/* nav */}
                {!isnNew && <View style={styles.navView}>
                    {navOptions.map((item, index) => {
                        let { name, onPress, icon } = returnNameAndFunc(item.type)
                        return navOption(onPress, name, index, icon, item.type, screen)
                    })}
                </View>}
                {/* screen */}
                {Screens(screen)}
            </View>
        </Modal>
    )
};
const stylesR = (colors) => StyleSheet.create({
    bntAddIcon: {
        fontSize: "1.2vw",
        paddingRight: "0.5vw",
        alignSelf: "center",
        color: colors.backgroundSections
    },
    main: {
        flex: 1,
        width: "100%",
        paddingVertical: "1vw",
        alignItems: "center",
        flexDirection: "column",
    },
    navView: {
        alignItems: "center",
        flexDirection: "row"
    },
    btnNav: (flag) => ({
        backgroundColor: flag ? colors.background : "",
        width: "9vw",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingVertical: "0.3vw",
        paddingRight: "1vw",
        marginVertical: "0.5vw",
        borderRadius: "0.5vw"
    }),
    textNav: {
        fontSize: "1vw",
        color: colors.text,
        marginRight: "0.5vw"
    }
});
export default memo(UserEdit);