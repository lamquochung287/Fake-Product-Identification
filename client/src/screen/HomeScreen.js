import React from 'react';
import { Text, StyleSheet, View, Image } from "react-native";
import TabApp from '../components/TabApp';

const HomeScreen = () => {
    return (

        // <View style={{ width: "100%", height: "100%" }}>
        //     <View style={styles.header}>
        //         <Text style={styles.messageWelcome}>Welcome Simon</Text>
        //         <Image source={require("../../assets/user.png")} style={styles.avatar} />
        //     </View>
        //     <View style={styles.content}>

        //     </View>
        // </View>
        <TabApp></TabApp>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3AB4F2",
        flexDirection: "row",
        alignItems: "center"
    },
    messageWelcome: {
        color: "#F6F6F6",
        fontSize: 20,
        fontWeight: "bold",
        margin: 20
    },
    avatar: {
        width: 30,
        height: 30
    },
    content: {
        flex: 1,
        backgroundColor: "#0078AA"
    }
})

export default HomeScreen;