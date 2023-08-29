import { View, StyleSheet, Text, TextInput, Button, Dimensions } from 'react-native';
import Color from "../util/Color"

const AddProductScreen = () => {
    return (
        <View style={styles.addProductContainer}>
            <Text style={styles.tittle}>Add Product</Text>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Manufacturer ID:</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Name:</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Brand:</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product SN:</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Price:</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={{ width: 200, margin: "auto", marginTop: 20 }}>
                    <Button title="Add" color={Color.buttonColor} />
                </View>
            </View>
        </View>
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
})
export default AddProductScreen;