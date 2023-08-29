import { View, Text, StyleSheet, Image, Button } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const DetailItem = ({ route }) => {
    const item = route.params.product;
    const resultVerify = route.params.resultVerify;
    const navigation = useNavigation()
    const editHandle = () => {
        navigation.navigate("Edit Product Screen", { item: item })
    }
    return (
        <View style={style.screenContainer}>
            <View style={style.imageContainer}>
                <Image style={style.imageStyle} source={{ uri: item.image }} resizeMode="contain"></Image>
            </View>
            <View style={style.textContainer}>
                <Text style={style.textHeader}>ID: {item.id}</Text>
                <Text style={style.text}>{item.name}</Text>
                <Text style={style.text}>{item.productSN}</Text>
                <Text style={style.text}>{item.brand}</Text>
                <Text style={style.text}>{item.price}</Text>
                {resultVerify !== undefined ?
                    <View style={[style.boxResult, resultVerify === true ? { borderColor: "green" } : { borderColor: "red" }]}>
                        <Text style={resultVerify === true ? { color: "green" } : { color: "red" }}>Result Verified: {resultVerify}</Text>
                    </View>
                    :
                    <View style={{ gap: 10 }}>
                        <Button title="Edit" onPress={editHandle} />
                        <Button title="Delete" />
                    </View>
                }
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
