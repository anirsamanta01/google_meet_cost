import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({ onAuthenticated }) => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }}>
        {() => <LoginScreen onLogin={onAuthenticated} />}
      </Stack.Screen>
      <Stack.Screen name="signup" options={{ headerShown: false }}>
        {() => <SignupScreen onSignUp={onAuthenticated} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
