import React from 'react'
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import HomeScreen from './src/screen/HomeScreen';
import ListManufacturerScreen from './src/screen/ListManufacturerScreen';
import HistoryScreen from './src/screen/HistoryScreen';
import DetailItem from './src/screen/DetailItem';
import EditProductScreen from './src/screen/EditProductScreen';
import VerifyProduct from './src/screen/VerifyProduct';

const Stack = createStackNavigator();

export const AppNavigation = () => {
    return (
        <Stack.Navigator screenOptions={
            {
                headerStyle: {
                    backgroundColor: 'rgb(32, 137, 220)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }
        }
            initialRouteName='Welcome Screen'
        >
            <Stack.Screen name="Welcome Screen" component={WelcomeScreen} options={{
                title: 'Welcome Screen',
            }} />
            <Stack.Screen name="Login Screen" component={LoginScreen} options={{
                title: 'Login Screen',
            }} />
            <Stack.Screen name="Register Screen" component={RegisterScreen} options={{
                title: 'Register Screen',
            }} />

            <Stack.Screen name="Home Screen" component={HomeScreen} options={{
                title: 'Home Screen',
                headerShown: false,
            }} />
            <Stack.Screen name="Detail Screen" component={DetailItem} options={{
                title: 'Detail Screen',
            }} />
            <Stack.Screen name="Edit Product Screen" component={EditProductScreen} options={{
                title: 'Edit Product Screen',
            }} />
            <Stack.Screen name="Verify Product Screen" component={VerifyProduct} options={{
                title: 'Verify Product Screen',
            }} />
        </Stack.Navigator >
    )
}

export default AppNavigation