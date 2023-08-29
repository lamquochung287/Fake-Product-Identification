import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Button, ScrollView, Alert } from "react-native";
import Color from "../util/Color"
import { useNavigation } from '@react-navigation/native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

const DescriptionScreen = () => {
    const navigation = useNavigation()
    const [imageSrc, setImage] = useState();
    const handleVerifyButton = () => {
        navigation.navigate("Verify Product Screen")
    }

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

    const verifyPermission = async () => {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissions = await requestPermission()
            return permissions.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permission", "You need to grant camera permission to use this app")
            return false;
        }
        return true;
    }

    const takeImage = async () => {
        const hasPermission = await verifyPermission()
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        })
        setImage(image.uri)
    }

    return (
        <View style={style.containerScreen}>
            <Image source={imageSrc ? { uri: imageSrc } : require("../../assets/scanImage.png")} style={style.imageStyle} resizeMode="contain" />
            <View style={{ flex: 1, alignItems: "center", marginTop: 10, gap: 15 }}>
                <Text style={style.text}>If you want to want to check your product</Text>
                <Text style={style.text}>Please click button below</Text>
                <View style={{ width: 150 }}>
                    <Button title="Verify product" color={Color.buttonColor} onPress={takeImage} />
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