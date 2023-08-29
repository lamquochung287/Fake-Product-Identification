import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import Color from "../util/Color"
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Account = ({ navigation }) => {
    return (
        <View style={styles.accountContainer}>
            <Image style={styles.image} source={require("../../assets/user.png")}></Image>
            <Text style={styles.header}>username</Text>
            {/* <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("List Manufacturer Screen")}>
                <Entypo name="list" size={24} color="gray" />
                <Text style={styles.buttonText}>View your manufacturer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("History Screen")}>
                <FontAwesome name="history" size={24} color="gray" />
                <Text style={styles.buttonText}>View your verify history</Text>
            </TouchableOpacity> */}
            <View style={{ marginTop: 30, width: 100 }}>
                <Button title="Log out" color={Color.buttonColor} onPress={() => { navigation.navigate("Welcome Screen") }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    accountContainer: {
        flex: 1,
        alignItems: "center",
        gap: 10
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "capitalize",
    },
    image: {
        width: 200,
        height: 200
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 500,
        color: "gray"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 15,
    }
})

export default Account;