import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importe suas telas
import LoginScreen from './components/LoginScreen'; 
import ChangePasswordScreen from './components/changePasswordScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
        
        
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
  );
}