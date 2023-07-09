import React, { memo, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import TextCustomize from '../../elements/TextCustomize';

const AssignRoles = ({ emploees, roles }) => {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const [emploeesOrRoles, setEmploeesOrRoles] = useState(true);

    return (
        <View style={styles.container}>
            {roles?.length === 0 ?
                <TextCustomize styleText={styles.header}>אין תפקידים</TextCustomize>
                :
                <>
                    {emploeesOrRoles ?
                        <View>
                            {emploees?.length > 0 && emploees.map((employ, index) => {
                                return <View
                                    key={index}
                                    style={styles.itemView}
                                ></View>
                            })}
                        </View>
                        :
                        <View>
                            {roles?.length > 0 && roles.map((role, index) => {
                                return <View
                                    key={index}
                                    style={styles.itemView}
                                ></View>
                            })}
                        </View>
                    }
                </>
            }
        </View>
    )
};
const stylesR = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: "1.3vw"
    },
    itemView: {
        width: "90%",
        height: "5vw",
        borderRadius: "2vw",
        backgroundColor: colors.background
    }
});
export default AssignRoles;