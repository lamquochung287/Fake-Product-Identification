import { View, Text, StyleSheet, Image, Button, Alert } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import DeleteConfirmation from '../components/DeleteConfirmation';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteProduct } from "../store/manufactuer/manufacturerSlice";


const DetailItem = ({ route }) => {
    const item = route.params.product;
    const resultVerify = route.params.resultVerify;
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const editHandle = () => {
        navigation.navigate("Edit Product Screen", { item: item })
    }

    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    const handleDeleteClick = () => {
        setConfirmationVisible(true);
    };

    const handleCancel = () => {
        setConfirmationVisible(false);
    };

    const handleConfirm = () => {
        setConfirmationVisible(false);
        handleDelete()
        navigation.navigate("Your Manufacturer")
    };


    const handleDelete = () => {
        dispatch(deleteProduct(item.product_id))
    }
    return (
        <View style={style.screenContainer}>
            <View style={style.imageContainer}>
                <Image style={style.imageStyle} source={{ uri: item.productimage }} resizeMode="contain"></Image>
            </View>
            <View style={style.textContainer}>
                <Text style={style.textHeader}>ID: {item.product_id}</Text>
                <Text style={style.text}>Product Name:  {item.productname}</Text>
                <Text style={style.text}>Product PIN:  {item.productpin}</Text>
                <Text style={style.text}>Product Price:  ${item.price}</Text>
                <View style={{ gap: 10 }}>
                    <Button title="Edit" onPress={editHandle} />
                    <Button title="Delete" onPress={handleDeleteClick} />
                </View>
                <DeleteConfirmation
                    isVisible={isConfirmationVisible}
                    message="Are you sure you want to delete?"
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            </View>
        </View >
    )
}
const style = StyleSheet.create({
    screenContainer: {
        height: "100%",
        marginHorizontal: 5,
        justifyContent: "center" && "flex-start",
    },
    imageStyle: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: "100%",
        height: "50%",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray"
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "bold",
    },
    textContainer: {
        margin: 10,
        gap: 5,
    },
    text: {
        fontSize: 15,
    },
    boxResult: {
        marginTop: 20,
        borderWidth: 1,
        padding: 5,
        alignItems: "center",
    }
})

export default DetailItem
