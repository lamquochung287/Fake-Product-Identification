import React from 'react';
import { Text, StyleSheet, View, Image, Button, ScrollView } from "react-native";
import Color from "../util/Color"

const DescriptionScreen = () => {
    return (
        <View style={style.containerScreen}>
            <Image source={require("../../assets/scanImage.png")} style={style.imageStyle} resizeMode="contain" />
            <View style={{ flex: 1, alignItems: "center", marginTop: 10, gap: 15 }}>
                <Text style={style.text}>If you want to want to check your product</Text>
                <Text style={style.text}>Please click button below</Text>
                <View style={{ width: 150 }}>
                    <Button title="Verify product" color={Color.buttonColor} />
                </View>
            </View>
        </View>

    )
}


const style = StyleSheet.create({
    containerScreen: {
        gap: 20,
        alignItems: 'center',
        marginTop: 20,
        height: "100%"
    },
    text: {
        fontSize: 16
    },
    imageStyle: {
        flex: 1,
        width: "70%",
        height: "100%",
    }
})

export default DescriptionScreen;