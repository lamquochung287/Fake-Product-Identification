import { View, StyleSheet, Text, TextInput, Button, Dimensions, Image, Alert, Pressable } from 'react-native';
import Color from "../util/Color"
import { launchCameraAsync, useCameraPermissions, PermissionStatus, ImagePicker, MediaTypeOptions } from 'expo-image-picker';
import { useState } from 'react';
import { addProduct } from '../store/manufactuer/manufacturerSlice';
import { useDispatch } from 'react-redux';

const AddProductScreen = () => {
    const [imageSrc, setImage] = useState();
    const dispatch = useDispatch();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    const [productName, setProductName] = useState('')
    const [productPIN, setProductPIN] = useState('')
    const [productPrice, setProductPrice] = useState('')

    const handleSubmit = () => {
        const product = { name: productName, productPIN: productPIN, productPrice: Number(productPrice), productImage: imageSrc }
        dispatch(addProduct(product))
    }


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
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        })
        setImage(image.uri)
    }
    return (
        <View style={styles.addProductContainer}>
            <Text style={styles.tittle}>Add Product</Text>
            <View style={{ flex: 1 }}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Name:</Text>
                    <TextInput style={styles.input} value={productName} onChangeText={text => setProductName(text)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product PIN:</Text>
                    <TextInput style={styles.input} value={productPIN} onChangeText={text => setProductPIN(text)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Price:</Text>
                    <TextInput style={styles.input} value={productPrice} onChangeText={text => setProductPrice(text)} />
                </View>
                <View style={[styles.inputContainer]}>
                    <Text style={styles.label}>Product Image:</Text>
                    <Pressable onPress={takeImage}>
                        <View style={{ height: 200, alignItems: "center" }}>
                            <Image source={imageSrc ? { uri: imageSrc } : require("../../assets/scanImage.png")} style={styles.imageStyle} resizeMode="contain" />
                        </View>
                    </Pressable>
                </View>
                <View style={{ width: 200, margin: "auto", marginTop: 20 }}>
                    <Button title="Add" color={Color.buttonColor} onPress={handleSubmit} />
                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    addProductContainer: {
        flex: 1,
        padding: 25,
        alignItems: 'left',
        gap: 5,
    },
    tittle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        padding: 3,
    },
    label: {
        fontSize: 12,
        color: 'gray',
    },
    inputContainer: {
        width: "100%",
    },
    imageStyle: {
        marginTop: 5,
        width: "70%",
        height: "90%",
    }
})
export default AddProductScreen;