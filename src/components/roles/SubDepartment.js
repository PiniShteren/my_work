import React, { memo, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import TextCustomize from '../../elements/TextCustomize';
import { Feather, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import TextInput from '../../elements/TextInput';
import Btn from '../../elements/Btn';
const SubDepartment = ({ item, isNew, isEdit, error, setAdd, add, setNewSubDepartment, deleteSubDepartment, addSubDepartmentFunc, departmentId }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);

    const [rolesFlag, setRolesFlag] = useState(false);

    return !isNew ? (
        <View
            style={styles.container}
        >

            <View style={styles.departmentViewRight}>
                <TextCustomize styleText={styles.name}>{item?.name}</TextCustomize>
            </View>
            <View style={styles.departmentViewMiddle}>
                <Pressable onPress={() => setRolesFlag(!rolesFlag)} style={styles.openListBtn}>
                    <TextCustomize styleText={styles.title}> רשימת תפקידים</TextCustomize>
                    <SimpleLineIcons name="arrow-down-circle" style={styles.openListIcon(rolesFlag)} />
                </Pressable>
            </View>
            <View style={styles.departmentViewLeft}>
                <TextCustomize styleText={styles.title}>תת מחלקות ({item?.roles?.length})</TextCustomize>
                <Pressable onPress={() => deleteRole(role?.id)} style={styles.departmentBnt}>
                    <Feather name="edit-2" style={styles.deleteIcon(false)} />
                </Pressable>
                <Pressable onPress={() => deleteSubDepartment(role?.id)} style={styles.departmentBnt}>
                    <MaterialIcons name="add" style={styles.deleteIcon(true)} />
                </Pressable>
            </View>
        </View>
    ) :
        (<View style={styles.container}>
            {isEdit ? <>
                <TextInput
                    errorText={error}
                    placeholder={"שם תת מחלקה"}
                    onChangeText={(txt) => setNewSubDepartment({ ...item, name: txt, department_id: departmentId })}
                    inputContainer={styles.inputContainer(true)}
                    onBlur={() => addSubDepartmentFunc(item)}
                    inputStyle={styles.inputStyle}
                    labelFlag={true}
                    value={item.name}
                />
                <Btn
                    animation={true}
                    style={{ ...styles.bntAdd, opacity: item?.name?.length < 2 ? 0.6 : 1 }}
                    disabled={item?.name?.length < 2}
                    onPress={() => addSubDepartmentFunc(item)}
                >
                    <TextCustomize styleText={styles.bntAddText}>הוסף תפקיד/קטגוריה</TextCustomize>
                </Btn>
            </>
                :
                <>
                    <Btn onPress={() => setAdd(true)} style={styles.departmentBnt}>
                        <MaterialIcons name="add" style={styles.addIcon} />
                    </Btn>
                </>}
        </View>)
};
const stylesR = (colors) => StyleSheet.create({
    container: {
        width: "95%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        columnGap: "1vw",
        borderRadius: "1.5vw",
        backgroundColor: colors.background,
        shadowColor: "black",
        backgroundColor: colors.background,
        borderWidth: "0.1vw",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        paddingHorizontal: "1vw",
        paddingVertical: "0.5vw",
    },
    departmentViewRight: {
        flex: 1,
        alignItems: "flex-start"
    },
    departmentViewMiddle: {
        flex: 1,
    },
    departmentViewLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    openListBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        color: colors.sub,
        fontSize: "1vw"
    },
    title: {
        color: colors.sub,
    },
    openListIcon: (flag) => ({
        fontSize: "1vw",
        color: colors.sub,
        marginRight: "0.5vw",
        transform: flag ? [{ rotate: "180deg" }] : []
    }),
    departmentBnt: {
        backgroundColor: colors.sub,
        borderRadius: "100%",
        marginRight: "0.5vw",
        width: "1.5vw",
        height: "1.5vw",
        alignItems: "center",
        justifyContent: "center",
    },
    deleteIcon: (flag) => ({
        fontSize: flag ? "1.2vw" : "0.8vw",
        color: colors.background,
        transform: flag ? [{ rotate: "45deg" }] : [],
    }),
    inputContainer: (flag) => ({
        width: !flag ? "10vw" : "21vw",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    }),
    inputStyle: {
        backgroundColor: colors.background,
        paddingHorizontal: "1vw",
        height: "1.8vw",
        fontSize: "0.9vw",
        width: "100%",
        color: colors.sub,
        outlineStyle: "none",
        border: "none",
        fontWeight: "500",
        textAlign: "right"
    },
    bntAdd: {
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.sub,
        flex: 1,
        height: "2vw",
        borderRadius: "1vw",
        paddingHorizontal: "1vw",
        paddingVertical: "0.5vw"
    },
    bntAddText: {
        fontSize: "0.8vw",
        color: colors.backgroundSections
    },
    addIcon: {
        fontSize: "1.2vw",
        color: colors.background,
    }
});
export default SubDepartment;