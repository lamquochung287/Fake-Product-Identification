import React from 'react'
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from "@rneui/themed"

export const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ height: '100%' }}>
            {/* <Header centerComponent={{ text: 'Fake Product Identification', style: { color: '#fff', flex: 1 } }} /> */}
            <View style={styles.container}>
                <Text style={{ fontSize: 15 }}>Please login or register to identify your product</Text>
                <Button title="Login" style={styles.button} onPress={() => navigation.navigate('Login Screen')} />
                <Button title="Register" style={styles.button} onPress={() => navigation.navigate('Register Screen')} />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },
    button: {
        width: 100,
    }
});

export default WelcomeScreen
