import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper';
import { setEditUser, setLoading, setRolesFlag } from '../../redux/actions';
import { MaterialCommunityIcons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '@rneui/base';
import { permission } from '../../core/permissions';
import { ScrollView } from 'react-native';
import { Pressable } from 'react-native';
import Checkbox from '../../elements/Checkbox';
import UserEdit from './UserEdit';
import TextCustomize from '../../elements/TextCustomize';
import { getFirstLetters } from "../../core/ShortName";
import { TouchableOpacity } from 'react-native';
import SearchInput from '../../elements/SearchInput';
import Btn from '../../elements/Btn';

export default function HomeEmploys({ }) {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const dispatch = useDispatch();
    const users = useSelector(state => state.usersState.users);

    const [usersState, setUsersState] = useState([]);
    const [usersStateBefore, setUsersStateBefore] = useState([]);
    const [chosseUsers, setChosseUsers] = useState('');
    const [typeFilter, setTypeFilter] = useState({ type: "permission", flag: false });
    const [search, setSearch] = useState("");

    const addOrRemoveUserToSelect = (id, flag) => {
        let text;
        if (flag) {
            if (chosseUsers.split(",").length === usersState.length) {
                setChosseUsers("");
            } else {
                setChosseUsers(usersState.map((e) => e.id).join(","));
            }
        } else {
            if (chosseUsers.indexOf(id) === -1) {
                text = chosseUsers;
                text += `${id},`;
                setChosseUsers(text);
            } else {
                text = chosseUsers;
                text = text.replace(`${id},`, "");
                setChosseUsers(text);
            }
        }
    }

    const sortEmploys = (type) => {
        let employees = usersState;

        switch (type.type) {
            case "permission":
                if (type.flag) {
                    employees = employees.sort((a, b) => (a.permission < b.permission) ? -1 : (a.permission > b.permission) ? 1 : 0);
                    return setUsersState([...employees]);
                } else {
                    employees = employees.sort((a, b) => (a.permission < b.permission) ? 1 : (a.permission > b.permission) ? -1 : 0);
                    return setUsersState([...employees]);
                }
            case "email":
                if (type.flag) {
                    employees = employees.sort((a, b) => (a.email < b.email) ? -1 : (a.email > b.email) ? 1 : 0);
                    return setUsersState([...employees]);
                } else {
                    employees = employees.sort((a, b) => (a.email < b.email) ? 1 : (a.email > b.email) ? -1 : 0);
                    return setUsersState([...employees]);
                }
            case "name":
                if (type.flag) {
                    employees = employees.sort((a, b) => {
                        if (a.first_name > b.first_name) {
                            return 1;
                        } else if (a.first_name < b.first_name) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                    return setUsersState([...employees]);
                } else {
                    employees = employees.sort((a, b) => {
                        if (a.first_name > b.first_name) {
                            return -1;
                        } else if (a.first_name < b.first_name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    return setUsersState([...employees]);
                }
        }
    }

    const changeFilter = (type) => {
        if (typeFilter.type === type) {
            setTypeFilter({ ...typeFilter, flag: !typeFilter.flag });
        } else {
            setTypeFilter({ type: type, flag: true });
        }
    }

    useEffect(() => {
        setUsersState(usersStateBefore.filter((e) => e.first_name.indexOf(search) > -1));
    }, [search])

    useEffect(() => {
        if (users.length > 0) {
            setUsersState(users);
            setUsersStateBefore(users);
        }
    }, [users]);

    useEffect(() => {
        sortEmploys(typeFilter);
    }, [typeFilter]);

    ///

    const filterPlayersView = (
        <View style={styles.topFilter}>
            <Btn animation={true} style={styles.filterView("center")} onPress={() => changeFilter("name")}>
                <TextCustomize styleText={styles.filterText}>מיין לפי שם</TextCustomize>
                <Entypo name='select-arrows' style={styles.filterIcon} />
            </Btn>
            <Btn animation={true} style={styles.filterView("center")} onPress={() => changeFilter("email")}>
                <TextCustomize styleText={styles.filterText}>מיין לפי מייל</TextCustomize>
                <Entypo name='select-arrows' style={styles.filterIcon} />
            </Btn>
            <Btn animation={true} style={styles.filterView("center")} onPress={() => changeFilter("permission")}>
                <TextCustomize styleText={styles.filterText}>מיין לפי הרשאות</TextCustomize>
                <Entypo name='select-arrows' style={styles.filterIcon} />
            </Btn>
            <View style={styles.filterView("space-between", true)}>
                <SearchInput
                    inputContainer={styles.inputView}
                    inputStyle={styles.input}
                    onChange={(txt) => setSearch(txt)}
                    icon={<FontAwesome name="search" style={{
                        fontSize: "1vw",
                        marginHorizontal: "0.5vw",
                        color: colors.iconDark
                    }} />}
                />
            </View>
            <Checkbox
                onPress={() => addOrRemoveUserToSelect(false, true)}
                flag={usersState.length === chosseUsers.split(",").length} />
        </View>
    );

    return (
        <>
            <View style={styles.main}>
                <TextCustomize styleText={styles.header}>כל העובדים</TextCustomize>
                <View style={styles.headerView}>
                    <Btn animation={true} style={styles.bntAdd} onPress={() => dispatch(setEditUser({}, true))}>
                        <TextCustomize styleText={styles.bntAddText}>הוסף עובד</TextCustomize>
                        <MaterialIcons name="add" style={styles.bntAddIcon} />
                    </Btn>
                    <Btn animation={true} style={styles.bntAdd} onPress={() => dispatch(setRolesFlag(true))}>
                        <TextCustomize styleText={styles.bntAddText}> קטגוריות/תפקידים</TextCustomize>
                        <MaterialIcons name="category" style={styles.bntAddIcon} />
                    </Btn>
                </View>
                {filterPlayersView}
                <ScrollView style={styles.scroll_c} contentContainerStyle={styles.scroll_m}>
                    {usersState.map((user, index) => {
                        return (
                            <Pressable key={index}
                                style={({ hovered }) => [styles.employ_view,
                                hovered && { backgroundColor: colors.iconLight },
                                chosseUsers.indexOf(user.id) >= 0 && { backgroundColor: colors.color4 }]}
                                onPress={() => { dispatch(setEditUser(user, false)) }}>
                                {/* image and name */}
                                <View style={styles.employSection()}>
                                    <View style={styles.profile_bg}>
                                        {user.profile_image?.uri?.length > 0 || user.profile_image?.link?.length > 0 ?
                                            <Image
                                                style={styles.profile_image}
                                                source={{ uri: user.profile_image?.uri || user.profile_image?.link }}
                                            /> : <TextCustomize styleText={styles.nameShort}>{getFirstLetters(user.first_name, user.last_name)}</TextCustomize>}
                                    </View>
                                    <View style={styles.nameAndRole}>
                                        <TextCustomize styleText={styles.employ_name(false)}>{user.first_name}</TextCustomize>
                                        <TextCustomize styleText={styles.employ_name(false)}>{user.last_name}</TextCustomize>
                                    </View>
                                </View>
                                {/* email and phone */}
                                <View style={styles.employSection("center")}>
                                    <View style={styles.emailAndPhoneView}>
                                        <View style={styles.email_view}>
                                            <TextCustomize number_of_line={1} styleText={styles.emailAndPhone}>
                                                {user.email}
                                            </TextCustomize>
                                            <View
                                                style={styles.icon_view}>
                                                <MaterialCommunityIcons name='email-outline' style={styles.icon} />
                                            </View>
                                        </View>
                                        <View style={styles.phone_view}>
                                            <TextCustomize styleText={styles.emailAndPhone}>
                                                {user.phone_number}
                                            </TextCustomize>
                                            <View
                                                style={styles.icon_view}>
                                                <MaterialCommunityIcons name='cellphone' style={styles.icon} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* permission */}
                                <View style={styles.left}>
                                    <View style={styles.permission_view}>
                                        <TextCustomize styleText={styles.permissionText(+user.permission)}>{permission.find((e) => e.value === user.permission).name}</TextCustomize>
                                    </View>
                                </View>
                                <View style={styles.employSection("center")}>
                                    <TextCustomize styleText={styles.emailAndPhone}>{user.id_number}</TextCustomize>
                                </View>
                                {/* checkbox */}
                                <View style={styles.employSection("flex-end", true)}>
                                    <Checkbox onPress={() => addOrRemoveUserToSelect(user.id)} flag={chosseUsers.indexOf(user.id) >= 0} />
                                </View>
                            </Pressable>
                        )
                    })}
                </ScrollView>
            </View>
        </>
    )
}

const stylesR = (colors) => StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        writingDirection: "rtl"
    },
    headerView: {
        paddingLeft: "1vw",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "1vw",
    },
    header: {
        fontSize: "1.3vw",
        fontWeight: "700",
        marginRight: "1vw",
        marginBottom: "1vw",
        alignSelf: "flex-start",
    },
    bntAdd: {
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.color1,
        marginRight: "1vw",
        borderRadius: "1vw",
        paddingHorizontal: "1vw",
        paddingVertical: "0.3vw"
    },
    bntAddText: {
        fontSize: "1vw",
        color: colors.backgroundSections
    },
    bntAddIcon: {
        fontSize: "1vw",
        paddingRight: "0.7vw",
        alignSelf: "center",
        color: colors.backgroundSections
    },
    topFilter: {
        width: "100%",
        height: "3vw",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: "0.5vw",
        paddingLeft: "1vw",
    },
    filterView: (justifyContent, flag) => ({
        flex: 1,
        borderRadius: "1.5vw",
        marginLeft: !flag ? "0.5vw" : "",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "0.5vw",
        backgroundColor: colors.backgroundSections,
        height: "3vw",
        justifyContent: justifyContent
    }),
    filterIcon: {
        fontSize: "1vw",
        // marginBottom: "0.5vw",
        marginRight: "0.5vw",
        color: colors.iconDark
    },
    inputView: {
        // backgroundColor: colors.background,
        width: "100%",
        height: "2vw",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: "0.5vw",
        borderRadius: "1.5vw",
    },
    input: {
        paddingRight: "1.5vw",
        height: "1vw",
        fontSize: "0.9vw",
        flex: 1,
        fontFamily: "myFont",
        color: colors.text,
        paddingHorizontal: "1vw",
        outlineStyle: "none",
        border: "none",
        fontWeight: "500",
        textAlign: "right"
    },
    filterText: {
        fontSize: "1vw",
    },
    scroll_c: {
        writingDirection: "ltr",
        width: "100%",
        padding: "0.5vw",
    },
    scroll_m: {
        writingDirection: "rtl"
    },
    employ_view: {
        // width: "100%",
        // height: "3vw",
        // flexDirection: "row",
        // alignItems: "center",
        // paddingRight: "0.5vw",
        // paddingLeft: "2vw",
        width: "100%",
        height: "4vw",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        borderRadius: "1.5vw",
        marginBottom: "0.5vw",
        backgroundColor: colors.backgroundSections
    },
    employSection: (justifyContent, flag) => ({
        flex: !flag ? 1 : "",
        paddingHorizontal: "0.5vw",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: justifyContent
    }),
    profile_bg: {
        borderRadius: "100%",
        width: "2.5vw",
        height: "2.5vw",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    },
    profile_image: {
        resizeMode: "cover",
        width: "2.5vw",
        height: "2.5vw",
        borderRadius: "100%",
    },
    nameShort: {
        fontSize: "1.3vw",
        fontWeight: "bold",
    },
    nameAndRole: {
        width: "15vw",
    },
    emailAndPhoneView: {
        alignItems: "flex-end",
        width: "50%"
    },
    email_view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "0.1vw",
    },
    phone_view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: "0.1vw"
    },
    icon_view: {
        height: "0.8vw"
    },
    emailAndPhone: {
        fontSize: "0.8vw",
        fontWeight: "500",
    },
    employ_name: (flag) => ({
        marginRight: "1vw",
        fontSize: "1.1vw",
        fontWeight: "400",
    }),
    icon: {
        color: colors.iconDark,
        fontSize: "0.8vw",
        marginRight: "0.5vw"
    },
    left: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: "0.5vw",
    },
    permissionText: (permission) => ({
        fontSize: "0.8vw",
        fontWeight: "500",
        color: colors[`permission${permission}`],
        backgroundColor: colors[`permission${permission}`] + "29",
        borderRadius: "0.5vw",
        textAlignVertical: "middle",
        paddingHorizontal: "0.5vw",
        paddingVertical: "0.2vw",
    }),
})