import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export const LoginScreen = () => {

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
                <TextInput style={styles.textInput} keyboardType="default" placeholder={"Username"} />
                <TextInput style={styles.textInput} placeholder={"Password"} secureTextEntry={true} />
                <Button title="Login" />
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