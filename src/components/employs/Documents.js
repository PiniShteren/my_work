import React, { memo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
const Documants = ({ }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);
    return (
        <View>
            <Text>Documants</Text>
        </View>
    )
};
const stylesR = (colors) => StyleSheet.create({
});
export default memo(Documants);