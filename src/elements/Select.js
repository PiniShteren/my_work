import React, { memo, useRef } from 'react';
import { useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
const Select = ({ selectPopupView, children, setFlag }) => {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const selectRef = useRef(null);

    useEffect(() => {
        const closeFunc = ({ target }) => {
            if (selectRef.current && !selectRef.current.contains(target)) {
                setFlag();
            }
        }
        window.addEventListener("click", closeFunc);
        return () => {
            window.removeEventListener("click", closeFunc);
        }
    }, [selectRef.current]);
    return (
        <View
            nativeID='shadow-filter'
            ref={selectRef}
            style={selectPopupView}
        >
            {children}
        </View>
    )
};
const stylesR = (colors) => StyleSheet.create({

});
export default memo(Select);