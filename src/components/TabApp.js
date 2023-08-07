import Account from "../screen/Account";
import AddProductScreen from "../screen/AddProductScreen";
import DescriptionScreen from "../screen/DescriptionScreen";
import HomeScreen from "../screen/HomeScreen"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Color from "../util/Color"
const Tabs = createBottomTabNavigator();

const TabApp = () => {
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
            <Tabs.Screen name="Description" component={DescriptionScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialIcons name="description" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="Add Product" component={AddProductScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="add-circle-sharp" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <AntDesign name="user" size={size} color={color} />
                ),
            }} />
        </Tabs.Navigator>
    )
}

export default TabApp;