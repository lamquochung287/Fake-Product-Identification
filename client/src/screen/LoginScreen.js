import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import Color from '../util/Color';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../store/login/loginSlice';

export const LoginScreen = () => {
    const navigation = useNavigation()
    const { isLogin } = useSelector((state) => state.login)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleLogin = () => {
        const input = { username: username, password: password }
        dispatch(loginAction(input))
        // navigation.navigate("Home Screen")
    }

    useEffect(() => {
        if (isLogin === true) {
            navigation.navigate("Home Screen")
        }
    }, [isLogin])
    return (
        <SafeAreaView style={{
            marginVertical: 15,
            marginHorizontal: 5, height: '100%', alignItems: 'center', justifyContent: 'center'
        }}>
            <View style={styles.loginFormContainer}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: 'center' }}>
                    <Text style={styles.textLoginForm}>Login</Text>
                    <Image source={require('../../assets/qrScanIcon.jpg')} style={{ width: 40, height: 40 }} />
                </View>
                <TextInput style={styles.textInput} keyboardType="default" placeholder={"Username"} value={username} onChangeText={text => setUsername(text)} />
                <TextInput style={styles.textInput} placeholder={"Password"} secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} />
                <Button title="Login" onPress={handleLogin} color={Color.buttonColor} />
            </View >
        </SafeAreaView >
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    loginFormContainer: {
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: "center",
        gap: 5,
        width: "100%",
    },
    textLoginForm: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    textInput: {
        width: "60%",
        height: 30,
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
    },
})