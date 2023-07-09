import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import TextCustomize from '../../elements/TextCustomize';
import { Feather, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import TextInput from '../../elements/TextInput';
import Btn from '../../elements/Btn';
import SubDepartment from './SubDepartment';
import { useContext } from 'react';
import { RolesContext } from '../../APIS/RolesAPI';
import { setLoading, setPopupMessage } from '../../redux/actions';
import { useDispatch } from 'react-redux';
const Department = ({ departmentItem, index, title, isNew, error, setNewDepartment, addDepartmentFunc, deleteDepartment }) => {

    const editRef = useRef(null);
    const dispatch = useDispatch();

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const { addOrEditSubDepartmentData } = useContext(RolesContext);

    const [departmentItemState, setDepartmentsState] = useState();
    const [departmentEdit, setDepartmentEdit] = useState();
    const [subDepartmentsFlag, setSubDepartmentsFlag] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [newSubDepartment, setNewSubDepartment] = useState(
        {
            name: "",
            id: null,
            department_id: null,
        }
    );
    useEffect(() => {
        setDepartmentsState(departmentItem);
    }, [departmentItem]);

    const addSubDepartmentFunc = (newDepartment) => {
        if (newDepartment?.name?.length > 1) {
            dispatch(setLoading(true));
            addOrEditSubDepartmentData(newDepartment)
                .then((res) => {
                    setNewSubDepartment({
                        name: "",
                        id: null,
                        department_id: null,
                    });
                    dispatch(setPopupMessage("הפעולה בוצעה בהצלחה", res, false));
                    dispatch(setLoading(false));
                })
                .catch((err) => {
                    dispatch(setPopupMessage("הפעולה נכשלה", err, true));
                    dispatch(setLoading(false));
                })
        } else {
            setErr("השם חייב להיות לפחות עם 2 תווים!!");
        }
    }

    const deleteSubDepartment = (id) => {
        dispatch(setLoading(true));
        addOrEditSubDepartmentData({ id: id }, true)
            .then((msg) => {
                dispatch(setPopupMessage("הפעולה בוצעה בהצלחה", msg, false));
                dispatch(setLoading(false));
            })
            .catch((err) => {
                dispatch(setPopupMessage("הפעולה נכשלה", err, true));
                dispatch(setLoading(false));
            })
    }

    return (
        <View
            key={index}
            style={styles.roleView(isNew)}
        >
            {!isNew ? <View style={styles.departmentView}>
                <View style={styles.departmentViewRight}>
                    {!edit ?
                        <TextCustomize styleText={styles.roleName}>{title}{departmentItemState?.name}</TextCustomize>
                        :
                        <>
                            <TextInput
                                errorText={error}
                                placeholder={"שם מחלקה"}
                                ref={editRef}
                                autoFocus={true}
                                onChangeText={(txt) => setDepartmentEdit({ ...departmentItem, name: txt })}
                                inputContainer={styles.inputContainer(false)}
                                onBlur={() => { setEdit(false); addDepartmentFunc(departmentEdit) }}
                                inputStyle={styles.inputStyle}
                                labelFlag={true}
                                value={departmentEdit?.name}
                            />
                            {/* <Btn
                                animation={true}
                                style={{ ...styles.bntAdd, opacity: departmentItem?.name?.length < 2 ? 0.6 : 1 }}
                                disabled={departmentItem?.name?.length < 2}
                                onPress={() => addDepartmentFunc(departmentItem)}
                            >
                                <TextCustomize styleText={styles.bntAddText}>עדכן</TextCustomize>
                            </Btn> */}
                        </>
                    }
                </View>
                <View style={styles.departmentViewMiddle}>
                    <Pressable onPress={() => setSubDepartmentsFlag(!subDepartmentsFlag)} style={styles.openListBtn}>
                        <TextCustomize>  רשימת תתי מחלקות</TextCustomize>
                        <SimpleLineIcons name="arrow-down-circle" style={styles.openListIcon(subDepartmentsFlag)} />
                    </Pressable>
                </View>
                <View style={styles.departmentViewLeft}>
                    <TextCustomize>תת מחלקות ({departmentItemState?.subDepartments?.length})</TextCustomize>
                    <Pressable onPress={() => { setDepartmentEdit(departmentItem); setEdit(true) }} style={styles.departmentBnt}>
                        <Feather name="edit-2" style={styles.deleteIcon(false)} />
                    </Pressable>
                    <Pressable onPress={() => deleteDepartment(departmentItemState?.id)} style={styles.departmentBnt}>
                        <MaterialIcons name="add" style={styles.deleteIcon(true)} />
                    </Pressable>
                </View>
            </View> :
                <View style={styles.departmentView}>
                    <TextInput
                        errorText={error}
                        placeholder={"שם מחלקה"}
                        autoFocus={true}
                        onChangeText={(txt) => setNewDepartment({ ...departmentItem, name: txt })}
                        inputContainer={styles.inputContainer(true)}
                        onBlur={() => addDepartmentFunc(departmentItem)}
                        inputStyle={styles.inputStyle}
                        labelFlag={true}
                        value={departmentItem.name}
                    />
                    <Btn
                        animation={true}
                        style={{ ...styles.bntAdd, opacity: departmentItem?.name?.length < 2 ? 0.6 : 1 }}
                        disabled={departmentItem?.name?.length < 2}
                        onPress={() => addDepartmentFunc(departmentItem)}
                    >
                        <TextCustomize styleText={styles.bntAddText}>הוסף תפקיד/קטגוריה</TextCustomize>
                    </Btn>
                </View>
            }

            {subDepartmentsFlag && <View style={styles.subDepartmentView}>
                <SubDepartment
                    item={newSubDepartment}
                    isNew={true}
                    isEdit={edit}
                    setAdd={setAdd}
                    add={add}
                    title={"שם תת מחלקה"}
                    setNewSubDepartment={setNewSubDepartment}
                    addSubDepartmentFunc={addSubDepartmentFunc}
                    departmentId={departmentItem?.id}
                />
                {departmentItem?.subDepartments?.map((e, index) => {
                    return <SubDepartment
                        item={e}
                        key={index}
                        addSubDepartmentFunc={addSubDepartmentFunc}
                        deleteSubDepartment={deleteSubDepartment}
                    />
                })}
            </View>}

        </View>
    )
};
const stylesR = (colors) => StyleSheet.create({
    roleView: (flag) => ({
        alignItems: "center",
        width: "100%",
        writingDirection: "rtl",
    }),
    departmentView: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        columnGap: "1vw",
        borderRadius: "1.5vw",
        backgroundColor: colors.background,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        paddingHorizontal: "1vw",
        paddingVertical: "0.5vw",
    },
    subDepartmentView: {
        width: "100%",
        alignItems: "center",
        marginTop: "0.5vw",
        rowGap: "0.5vw"
    },
    inputContainer: (flag) => ({
        width: !flag ? "10vw" : "21vw",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    }),
    inputStyle: {
        backgroundColor: colors.background,
        paddingHorizontal: "1vw",
        height: "2vw",
        fontSize: "0.9vw",
        width: "100%",
        color: colors.text,
        outlineStyle: "none",
        border: "none",
        fontWeight: "500",
        textAlign: "right"
    },
    bntAdd: {
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.color1,
        flex: 1,
        height: "2vw",
        borderRadius: "1vw",
        paddingHorizontal: "1vw",
        paddingVertical: "0.5vw"
    },
    bntAddText: {
        fontSize: "1vw",
        color: colors.backgroundSections
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
    roleName: {
        color: colors.color1,
        fontSize: "1vw",
        fontWeight: "500",
        textAlign: "center",
    },
    openListBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    openListIcon: (flag) => ({
        fontSize: "1vw",
        marginRight: "0.5vw",
        transform: flag ? [{ rotate: "180deg" }] : []
    }),
    departmentBnt: {
        backgroundColor: colors.color1,
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
    addIcon: {
        fontSize: "1.2vw",
        color: colors.background,
    }
});
export default Department;