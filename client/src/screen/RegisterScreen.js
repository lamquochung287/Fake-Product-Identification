import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { registerAction } from '../store/register/register';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


export const RegisterScreen = () => {
    const navigation = useNavigation()
    const [selectedValue, setSelectedValue] = useState("manufacturer")
    const { isSuccess, isError, messageError } = useSelector((state) => state.register)
    const dispatch = useDispatch()
    const [input, setInputValue] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: selectedValue,
    })
    const handleRegister = () => {
        dispatch(registerAction(input))

    }
    useEffect(() => {
        if (isSuccess === true) {
            Toast.show({
                type: 'success',
                text1: 'Register Success'
            });
            navigation.navigate("Login Screen")
        }
        if (isError) {
            Toast.show({
                type: 'error',
                text1: messageError
            });
        }

    }, [isSuccess, isError])

    const handleInput = (name, value) => {
        setInputValue({ ...input, [name]: value })
    }
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
                <TextInput placeholder={"Username"} style={styles.textInput} inlineImageLeft={require("../../assets/user.png")} onChangeText={(text) => handleInput("username", text)} />
                <TextInput placeholder={"Email"} style={styles.textInput} keyboardType="email-address" onChangeText={(text) => handleInput("email", text)} />
                <TextInput placeholder={"Password"} style={styles.textInput} secureTextEntry={true} onChangeText={(text) => handleInput("password", text)} />
                <TextInput placeholder={"Password Confirm"} style={styles.textInput} secureTextEntry={true} onChangeText={(text) => handleInput("passwordConfirm", text)} />
                <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} >
                    <Picker.Item label="Manufacturer" value="manufacturer" defaultValue={selectedValue} />
                    <Picker.Item label="User" value="user" />
                </Picker>
                <Button title="Register" onPress={handleRegister} />
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