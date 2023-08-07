import React from 'react'
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import HomeScreen from './src/screen/HomeScreen';


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
            initialRouteName='Home Screen'
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
                headerLeft: null,
                headerShown: false,
            }} />
        </Stack.Navigator >
    )
}

export default AppNavigation