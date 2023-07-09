import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import LottieView from 'lottie-react';

export default function Loading() {
    return (
        <View style={{position: "absolute", zIndex: 11, width: "100%", height: "100vh", justifyContent: "center", backgroundColor: "#00000063"}}>
            <LottieView
                animationData={require("./loading.json")}
                autoPlay
                loop
                style={{
                    width: "40vw",
                    height: "40vw",
                    alignSelf: "center",
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})