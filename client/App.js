import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from "./src/store/store"
import { useEffect } from 'react';
const Stack = createStackNavigator();
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>App</Text>
    //   <StatusBar style="auto" />
    // </View>
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
        <Toast />
      </Provider>
    </SafeAreaProvider>
  );
}

