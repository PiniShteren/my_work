import React, { memo } from 'react';
import { TextInput } from 'react-native';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
const SearchInput = ({ icon, inputStyle, inputContainer, onChange }) => {
    const { colors } = useTheme();
    const styles = stylesR(colors);
    return (
        <View style={inputContainer}>
            <TextInput 
            placeholderTextColor={colors.color3} 
            placeholder='...חיפוש' 
            style={inputStyle} onChangeText={onChange}/>
            {icon}
        </View>
    )
};
const stylesR = (colors) => StyleSheet.create({
});
export default memo(SearchInput);