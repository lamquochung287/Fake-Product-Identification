import { View, Text, StyleSheet, Image, Button, TextInput } from "react-native"
import Color from "../util/Color";

const EditProductScreen = ({ route }) => {
    const item = route.params.item;
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.textHeader}>
                Edit Product
            </Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Manufacturer ID:</Text>
                    <TextInput style={[styles.input, { backgroundColor: "#999DA0" }]} value={item.id} disabled={true} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Name:</Text>
                    <TextInput style={styles.input} value={item.name} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Brand:</Text>
                    <TextInput style={styles.input} value={item.brand} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product SN:</Text>
                    <TextInput style={styles.input} value={item.productSN} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Price:</Text>
                    <TextInput style={styles.input} value={item.price} />
                </View>
                <View style={{ width: 200, margin: "auto", marginTop: 20 }}>
                    <Button title="Add" color={Color.buttonColor} />
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
})

export default EditProductScreen