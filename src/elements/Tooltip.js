import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Pressable, StyleSheet, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Tooltip as TooltipE, Text } from '@rneui/themed';
import TextCustomize from './TextCustomize';
const Tooltip = ({ open, children, focus, labelFlag }) => {
    const { colors } = useTheme();
    const viewRef = useRef(null);
    const styles = stylesR(colors);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        setWidth(viewRef.current?.getBoundingClientRect()?.width);
        console.log(width);
    }, [viewRef.current]);
    return (
        <View
            ref={viewRef}
            style={[{
                alignItems: "center", justifyContent: "center", borderColor: colors.error, borderWidth: open ? "0.1vw" : "0",
                borderColor: focus ? colors.color1 : "transparent",
                borderWidth: "0.1vw",
                shadowColor: focus ? colors.color1 : "transparent",
                shadowOffset: { height: 0, width: 0 },
                shadowRadius: 2,
                shadowOpacity: 1,
                borderRadius: "1.3vw",
                flex: labelFlag ? 1 : ""
            }
            ]}
        >
            {open && <View style={{
                position: "absolute",
                right: `${width + 10}px`,
                width: "7vw",
                backgroundColor: colors.iconLight,
                paddingHorizontal: "1vw",
                paddingVertical: "0.3vw",
                borderRadius: "0.3vw",
                flexDirection: "row",
            }}>
                <View style={styles.triangle} />
                <TextCustomize styleText={{ color: colors.error, fontSize: "0.6vw", textAlign: "center" }} number={false}>{open}</TextCustomize>
            </View>}
            {children}
        </View>
    )
};
const stylesR = (colors) => StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: "0.6vw",
        borderTopWidth: "0.4vw",
        borderBottomWidth: "0.4vw",
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: colors.iconLight,
        position: "absolute",
        right: "-0.5vw"
    }
});
export default memo(Tooltip);