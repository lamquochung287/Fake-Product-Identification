import React from 'react'
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const TittleApp = ({ navigation }) => {
    return (
        <View style={styles.tittleContainer}>
            <AntDesign name="qrcode" size={24} color="black" />
            <Text style={styles.textTittle}>QR Scan</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tittleContainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    textTittle: {
        fontSize: 20,
        fontWeight: "bold",
    }
})

export default TittleApp