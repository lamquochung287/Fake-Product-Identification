import React from 'react'
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native-elements';


const Stack = createStackNavigator();

export const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome Screen" component={WelcomeScreen} options={{
                title: 'Welcome Screen',
                headerStyle: {
                    backgroundColor: 'rgb(32, 137, 220)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <Stack.Screen name="Login Screen" component={LoginScreen} options={{
                title: 'Login Screen',
                headerStyle: {
                    backgroundColor: 'rgb(32, 137, 220)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <Stack.Screen name="Register Screen" component={RegisterScreen} options={{
                title: 'Register Screen',
                headerStyle: {
                    backgroundColor: 'rgb(32, 137, 220)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </Stack.Navigator>
    )
}

export default AppNavigation