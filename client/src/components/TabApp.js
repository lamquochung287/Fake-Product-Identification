import Account from "../screen/Account";
import AddProductScreen from "../screen/AddProductScreen";
import DescriptionScreen from "../screen/DescriptionScreen";
import HomeScreen from "../screen/HomeScreen"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Color from "../util/Color"
import HistoryScreen from "../screen/HistoryScreen";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ListManufacturerScreen from "../screen/ListManufacturerScreen";
import { useSelector } from "react-redux";
import { View } from "react-native";
const Tabs = createBottomTabNavigator();


const TabApp = () => {
    const { userRole } = useSelector((state) => state.login)
    return (
        <Tabs.Navigator
            screenOptions={{
                activeTintColor: Color.lightColor,
                headerStyle: {
                    backgroundColor: Color.mainColor,
                },
                headerTintColor: Color.textColor
            }}
        >
            <Tabs.Screen name="Verify Product" component={DescriptionScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialIcons name="description" size={size} color={color} />
                ),
            }} />
            {userRole === 'user' ?
                <Tabs.Screen name="History Verify" component={HistoryScreen} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome name="history" size={size} color={color} />
                    ),
                }} />
                :
                <>

                    <Tabs.Screen name="Add Product" component={AddProductScreen}
                        options={{
                            tabBarIcon: ({ focused, color, size }) => (
                                <Ionicons name="add-circle-sharp" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen name="History Verify" component={HistoryScreen} options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="history" size={size} color={color} />
                        ),
                    }} />
                    <Tabs.Screen name="Your Manufacturer" component={ListManufacturerScreen} options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Entypo name="list" size={size} color={color} />
                        ),
                    }} />
                </>
            }
            <Tabs.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <AntDesign name="user" size={size} color={color} />
                ),
            }} />

        </Tabs.Navigator>
    )
}

export default TabApp;