import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import TextInput from '../../elements/TextInput';
import Btn from '../../elements/Btn';
import TextCustomize from '../../elements/TextCustomize';
import { useDispatch } from 'react-redux';
import { setLoading, setPopupMessage } from '../../redux/actions';
import { RolesContext } from '../../APIS/RolesAPI';
import { Feather, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import Department from './Department';
const AddRole = ({ departments }) => {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const inputRef = useRef(null);

    const { addOrEditDepartmentData } = useContext(RolesContext);

    const dispatch = useDispatch();

    const [newDepartment, setNewDepartment] = useState(
        {
            name: "",
            id: null
        }
    );
    const [departmentsState, setDepartmentsState] = useState([]);
    const [error, setErr] = useState("");

    const addDepartmentFunc = (newDepartment) => {
        if (newDepartment?.name?.length > 1) {
            dispatch(setLoading(true));
            addOrEditDepartmentData(newDepartment)
                .then((res) => {
                    setNewDepartment({
                        name: "",
                        id: null
                    });
                    dispatch(setPopupMessage("הפעולה בוצעה בהצלחה", res, false));
                    dispatch(setLoading(false));
                    inputRef.current?.focus();
                })
                .catch((err) => {
                    dispatch(setPopupMessage("הפעולה נכשלה", err, true));
                    dispatch(setLoading(false));
                })
        } else {
            setErr("השם חייב להיות לפחות עם 2 תווים!!");
        }
    }

    const deleteDepartment = (id) => {
        dispatch(setLoading(true));
        addOrEditDepartmentData({ id: id }, true)
            .then((msg) => {
                dispatch(setPopupMessage("הפעולה בוצעה בהצלחה", msg, false));
                dispatch(setLoading(false));
            })
            .catch((err) => {
                dispatch(setPopupMessage("הפעולה נכשלה", err, true));
                dispatch(setLoading(false));
            })
    }

    useEffect(() => {
        setDepartmentsState(departments);
    }, [departments]);

    const departmentComponent = () => {
        return <View>
            <TextCustomize>מחלקה</TextCustomize>
            <TextInput
                errorText={error}
                placeholder={"שם מחלקה"}
                autoFocus={true}
                ref={inputRef}
                onChangeText={(txt) => setNewRole(txt)}
                inputContainer={styles.inputContainer}
                onBlur={() => addDepartmentFunc()}
                inputStyle={styles.inputStyle}
                labelFlag={true}
                value={newRole.name}
            />
        </View>
    }

    return (
        <>
            {/* {departmentComponent()} */}
            {/* add category */}
            {/* <View style={styles.addView}>
                <TextInput
                    errorText={error}
                    placeholder={"שם התפקיד"}
                    autoFocus={true}
                    ref={inputRef}
                    onChangeText={(txt) => setNewRole(txt)}
                    inputContainer={styles.inputContainer}
                    onBlur={() => addDepartmentFunc()}
                    inputStyle={styles.inputStyle}
                    labelFlag={true}
                    value={newRole}
                />
               
            </View> */}
            {/* main */}
            <View style={styles.mainContainer}>
                <ScrollView
                    style={styles.scroll_c}
                    contentContainerStyle={styles.main}
                    stickyHeaderIndices={[0]}
                >
                    <Department
                        err={error}
                        departmentItem={newDepartment}
                        setNewDepartment={setNewDepartment}
                        isNew={true}
                        title={"שם המחלקה"}
                        addDepartmentFunc={addDepartmentFunc}
                    />
                    {departmentsState?.length > 0 && departmentsState.map((department, index) => {
                        return (
                            <Department
                                departmentItem={department}
                                index={index}
                                title={"מחלקה - "}
                                addDepartmentFunc={addDepartmentFunc}
                                deleteDepartment={deleteDepartment}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </>
    )
};
const stylesR = (colors) => StyleSheet.create({
    addView: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "2vw"
    },

    mainContainer: {
        flex: 1,
        width: "90%",
    },
    scroll_c: {
        margin: "1vw",
    },
    main: {
        flex: 1,
        padding: "1vw",
        rowGap: "1vw",
    },
});
export default memo(AddRole);