import { View, Text, StyleSheet, Image, Button, TextInput, Pressable } from "react-native"
import Color from "../util/Color";
import { launchCameraAsync, useCameraPermissions, PermissionStatus, ImagePicker, MediaTypeOptions } from 'expo-image-picker';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { editProduct } from "../store/manufactuer/manufacturerSlice";
import { useNavigation } from "@react-navigation/native";
const EditProductScreen = ({ route }) => {
    const item = route.params.item;
    const disptach = useDispatch()
    const [imageSrc, setImage] = useState(item.productimage);
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    const [productName, setProductName] = useState(item.productname)
    const [productPrice, setProductPrice] = useState(item.price)
    const [productPIN, setProductPIN] = useState(item.productpin)
    const navigation = useNavigation()

    const handleSubmit = () => {
        const product = {
            productID: item.product_id,
            productName: productName,
            productPrice: productPrice,
            productPIN: productPIN,
            productImage: imageSrc,
        }
        disptach(editProduct(product))
        navigation.navigate("Your Manufacturer")
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
        <View style={styles.screenContainer}>
            <Text style={styles.textHeader}>
                Edit Product
            </Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Manufacturer ID:</Text>
                    <TextInput style={[styles.input, { backgroundColor: "#999DA0" }]} value={item.manufacturer_id} disabled={true} />
                </View>
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
                            <Image source={imageSrc ? { uri: imageSrc } : { uri: item.productimage }} style={styles.imageStyle} resizeMode="contain" />
                        </View>
                    </Pressable>
                </View>
                <View style={{ width: 200, margin: "auto", marginTop: 20 }}>
                    <Button title="Update" color={Color.buttonColor} onPress={handleSubmit} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        height: "100%"
    },
    formContainer: {
        padding: 20,
    }
    ,
    textHeader: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
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

export default EditProductScreen