import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CardItemHistory = ({ product, resultVerify }) => {
    const navigation = useNavigation()
    // const pressHandle = () => {
    //     navigation.navigate("Detail Screen", { product: product, resultVerify: resultVerify });
    // }
    return (
        <View style={styles.cardItemContainer}>
            <Pressable android_ripple={{
                color: "#84eaf4"
            }} style={({ pressed }) => [{ opacity: pressed ? 0.2 : 1 }]}
            // onPress={pressHandle}
            >
                <View style={styles.flexRow}>
                    <Image source={require("../../assets/qrScanIcon.jpg")} style={styles.image} resizeMode="contain" />
                    <View style={{ flex: 2, justifyContent: "center" }}>

                        <Text style={styles.productID}>Product PIN: {product}</Text>
                    </View>
                    {resultVerify ?
                        <View View style={styles.justifyRightBottom}>
                            <Text style={resultVerify === "true" ? styles.textTrue : styles.textFalse}>Result: {resultVerify}</Text>
                        </View>
                        :


                        <View style={styles.justifyRight}>
                            <MaterialIcons name="navigate-next" size={24} color="black" />
                        </View>
                    }
                </View>
            </Pressable>
        </View>

    )
}


const styles = StyleSheet.create({
    cardItemContainer: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: "white",
    },
    flexRow: {
        flexDirection: "row",
        gap: 10,
    },
    image: {
        width: 100,
        height: 100,
        flex: 1,
    },
    introductionProduct: {
        color: "gray",
        fontSize: 10,
    },
    justifyRight: {
        flex: 0.2,
        justifyContent: "center",
    },
    justifyRightBottom: {
        flex: 0.6,
        justifyContent: "center",
    },
    productID: {
        fontWeight: 500,
    },
    text: {
        color: "gray",
        fontSize: 12,
    },
    textTrue: {
        color: "green",
        fontSize: 12,
    },
    textFalse: {
        color: "red",
        fontSize: 12,
    },

})
export default CardItemHistory