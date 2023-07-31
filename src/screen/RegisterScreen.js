import React from 'react'
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';


export const RegisterScreen = () => {
    return (
        <SafeAreaView style={{
            marginVertical: 15,
            marginHorizontal: 5, height: '100%', alignItems: 'center', justifyContent: "center"
        }}>
            <View style={styles.registerFormContainer}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: 'center' }}>
                    <Text style={styles.textRegisterForm}>Register</Text>
                    <Image source={require('../../assets/qrScanIcon.jpg')} style={{ width: 40, height: 40 }} />
                </View>
                <TextInput placeholder={"Username"} style={styles.textInput} inlineImageLeft={require("../../assets/user.png")} />
                <TextInput placeholder={"Email"} style={styles.textInput} keyboardType="email-address" />
                <TextInput placeholder={"Password"} style={styles.textInput} secureTextEntry={true} />
                <TextInput placeholder={"Password Confirm"} style={styles.textInput} secureTextEntry={true} />
                <Button title="Register" />
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    registerFormContainer: {
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        width: "100%",
    },
    textRegisterForm: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    textInput: {
        width: "60%",
        height: 30,
        borderColor: "black",
        borderWidth: 1,
        padding: 5
    }
})