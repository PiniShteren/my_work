import React, { memo, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import TextInput from '../../elements/TextInput';
import Header from '../../elements/Header';
import { addFiles } from '../../elements/AddFiles';
import { permission } from '../../core/permissions';
import Select from '../../elements/Select';
import TextCustomize from '../../elements/TextCustomize';
import Tooltip from '../../elements/Tooltip';
import Btn from '../../elements/Btn';
import { emailValidator, nameValidator, stringValidator, validatePhoneNumber } from '../../core/until';
import { useDispatch, useSelector } from 'react-redux';
import { UsersContext } from '../../APIS/UsersAPI';
import { setEditUser, setLoading, setPopupMessage } from '../../redux/actions';

const Personal = ({ userCurrent, ifChanged, setIfChangedState, isNew }) => {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    let userExample = {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        permission: "5",
        profile_image: "",
        phone_number: "",
        id_number: "",
        roles: "",
    };

    const dispatch = useDispatch();

    const { addOrEditUserData } = useContext(UsersContext);

    const [user, setUser] = React.useState();
    const [userCompare, setUserCompare] = React.useState();
    const [errorUser, setErrorUser] = React.useState({
        first_name: null,
        last_name: null,
        email: null,
        permission: null,
        profile_image: null,
        phone_number: null,
        id_number: null
    });

    const [showPopupPermissions, setShowPopupPermissions] = React.useState(false);

    useEffect(() => {
        if (user) {
            setUser({ ...userExample, ...userCurrent });
            setUserCompare({ ...userExample, ...userCurrent });
        } else {
            setUser({ ...userExample });
            setUserCompare({ ...userExample });
        }
    }, [userCurrent]);

    const handleChange = async (key, value) => {
        let temp = { ...user, [key]: value }
        await setUser(temp);
        if (Object.keys(errorUser).indexOf("flag") >= 0 && !errorUser.flag) {
            checkObject(temp);
        }
    };

    const checkObject = (temp) => {
        let flag = true;
        let userTemp = { ...user };
        if (temp) {
            userTemp = { ...temp };
        }
        let errors = {
            first_name: nameValidator(userTemp.first_name),
            last_name: nameValidator(userTemp.last_name),
            email: emailValidator(userTemp.email),
            permission: null,
            profile_image: null,
            id_number: stringValidator(userTemp.id_number, 9, "ת.ז."),
            phone_number: validatePhoneNumber(userTemp.phone_number),
        }
        Object.keys(errors).forEach((e) => {
            if (errors[e]) {
                flag = false;
            }
        });
        errors.flag = flag;
        setErrorUser(errors);
        return flag;
    }

    const handleSave = () => {
        if (checkObject()) {
            dispatch(setLoading(true));
            addOrEditUserData(user).then(() => {
                if(isNew){
                    dispatch(setEditUser(false))
                }
                dispatch(setLoading(false));
                dispatch(setPopupMessage("הפעולה הושלמה!", isNew ? "העובד נוסף בהצלחה" : "העובד עודכן בהצלחה", false));
            }).catch((err) => {
                dispatch(setLoading(false));
                dispatch(setPopupMessage("הפעולה נכשלה!", "", true));
            });
        }
    }

    const selectPermission = () => {
        let current = permission.find((e) => e.value === user?.permission);
        return (
            <View style={styles.selectView}>
                <Tooltip open={errorUser.permission}>
                    <Pressable
                        style={styles.selectBtn(showPopupPermissions)}
                        onPress={() => setShowPopupPermissions(!showPopupPermissions)}
                    >
                        <Text style={styles.permissionText(current && +current.value)}>
                            {current && current?.name}
                        </Text>
                    </Pressable>
                </Tooltip>
                {showPopupPermissions &&
                    <Select
                        setFlag={() => setShowPopupPermissions(false)}
                        selectPopupView={{
                            position: "absolute",
                            top: "100%",
                            marginTop: "0.5vw",
                            paddingTop: "0.5vw",
                            flexDirection: "row",
                            paddingHorizontal: "0.5vw",
                            borderRadius: "0.5vw",
                            width: "max-content",
                            gap: "0.5vw",
                            backgroundColor: colors.backgroundSections
                        }}
                    >
                        {
                            permission.map((item, index) => {
                                if (item.value === user?.permission) return;
                                return (<TouchableOpacity onPress={() => { setUser({ ...user, permission: item.value }); setShowPopupPermissions(false) }}>
                                    <Text style={styles.permissionText(index + 1, true)}>{item.name}</Text>
                                </TouchableOpacity>)
                            })
                        }
                    </Select>}
            </View >
        )
    }

    return (
        <View style={styles.main}>
            {isNew ? <Header center={true} color={colors.text}>עובד חדש</Header> : <Header center={true} color={colors.text}>פרטים אישיים</Header>}
            <View style={styles.top}>
                {/* name */}
                <View style={styles.nameView}>
                    <TextInput
                        label="*שם פרטי"
                        returnKeyType="next"
                        value={user?.first_name || ""}
                        inputStyle={styles.input}
                        inputContainer={styles.inputView}
                        labelStyle={styles.labelStyle}
                        errorText={errorUser.first_name}
                        onChangeText={text => handleChange("first_name", text)}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                    <TextInput
                        label="*שם משפחה"
                        returnKeyType="next"
                        value={user?.last_name || ""}
                        inputStyle={styles.input}
                        inputContainer={styles.inputView}
                        labelStyle={styles.labelStyle}
                        errorText={errorUser.last_name}
                        onChangeText={text => handleChange("last_name", text)}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                </View>
                {/* image profile */}
                <View style={styles.topLeft}>
                    <View style={styles.imageView}>
                        <TouchableOpacity style={styles.btnAddImage} onPress={() => addFiles(["image/png", "image/jpeg"].join(","), false, (file) => {
                            setUser({ ...user, profile_image: file });
                        })}>
                            {user?.profile_image?.uri || user?.profile_image?.link ?
                                <Image style={styles.image} source={{ uri: user?.profile_image.uri || user?.profile_image.link }} /> : <Text style={styles.btnAddImageText}></Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* top- left */}
            <View style={styles.middle}>
                {/* email and phone */}
                <View style={styles.emailView}>
                    <TextInput
                        label="*אימייל"
                        returnKeyType="next"
                        value={user?.email || ""}
                        inputStyle={styles.input}
                        inputContainer={styles.inputView}
                        labelStyle={styles.labelStyle}
                        errorText={errorUser.email}
                        onChangeText={text => handleChange("email", text)}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        label="*פלאפון"
                        returnKeyType="next"
                        value={user?.phone_number || ""}
                        inputStyle={styles.input}
                        inputContainer={styles.inputView}
                        labelStyle={styles.labelStyle}
                        errorText={errorUser.phone_number}
                        onChangeText={text => handleChange("phone_number", text.replace(/[^0-9]/g, ''))}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                </View>
                <View style={styles.middleLeft}>
                    <TextInput
                        label="*ת.ז."
                        returnKeyType="next"
                        value={user?.id_number || ""}
                        inputStyle={styles.input}
                        inputContainer={styles.inputView}
                        labelStyle={styles.labelStyle}
                        errorText={errorUser.id_number}
                        maxLength={9}
                        onChangeText={text => handleChange("id_number", text)}
                        autoCapitalize="none"
                    />
                    <View style={styles.inputView}>
                        <Text style={styles.labelStyle}>*רמת הרשאה</Text>
                        {selectPermission()}
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <Btn
                    animation={true}
                    onPress={() => handleSave()}
                    style={styles.btnSave}
                >
                    <TextCustomize styleText={styles.btnSaveText}>שמור</TextCustomize>
                </Btn>
            </View>
        </View>
    )
};
const stylesR = (colors) => StyleSheet.create({
    main: {
        flex: 1,
        width: "100%",
        writingDirection: "rtl",
        paddingHorizontal: "3vw",
        gap: "2vw"
    },
    top: {
        paddingTop: "1.5vw",
        alignItems: "center",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-evenly",
        zIndex: 3
    },
    topLeft: {
        width: "21vw",
        alignItems: "center",
    },
    imageView: {
        width: "7vw",
        height: "7vw",
        borderRadius: "100%",
        backgroundColor: colors.background,
    },
    image: {
        width: "7vw",
        height: "7vw",
        borderRadius: "100%",
        resizeMode: "cover"
    },
    btnAddImage: {
        width: "7vw",
        height: "7vw",
        borderRadius: "100%",
    },
    nameView: {
        alignItems: "center"
    },
    emailView: {
        alignItems: "center",
        zIndex: 2
    },
    inputView: {
        width: "21vw",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: "0.4vw",
        alignItems: "center",
    },
    input: {
        backgroundColor: colors.background,
        paddingHorizontal: "1vw",
        minHeight: "2.3vw",
        fontSize: "0.9vw",
        width: "15vw",
        color: colors.text,
        outlineStyle: "none",
        border: "none",
        fontWeight: "500",
        textAlign: "right"
    },
    labelStyle: {
        color: colors.text,
        fontSize: "0.8vw",
        fontWeight: "500",
        flex: 1,
        fontFamily: "myFont"
    },
    middle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    middleLeft: {
        flexDirection: "column",
    },
    permissionText: (permission, flag) => ({
        fontSize: "0.8vw",
        fontWeight: "500",
        width: flag ? "100%" : "max-content",
        color: colors[`permission${permission}`],
        backgroundColor: colors[`permission${permission}`] + "29",
        borderRadius: "0.5vw",
        paddingHorizontal: "0.5vw",
        marginBottom: flag ? "0.5vw" : "0",
        paddingVertical: "0.2vw",
        textAlign: "center",
    }),
    selectView: {
        width: "15vw",
        alignItems: "center",
        position: "relative",
    },
    selectBtn: (flag) => ({
        paddingHorizontal: "0.5vw",
        width: "15vw",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "2.3vw",
        borderRadius: "1.5vw",
        backgroundColor: flag ? colors.background : ""
    }),
    bottom: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2
    },
    btnSave: {
        backgroundColor: colors.color1,
        width: "10vw",
        alignItems: "center",
        paddingVertical: "0.5vw",
        borderRadius: "1vw",
    },
    btnSaveText: {
        color: colors.background
    }
});
export default memo(Personal);