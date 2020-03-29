import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from '../screens/LoginScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { Header } from '../components/Header'

const AuthStack = createStackNavigator()

export const AuthenticationStack = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name='Register'
        component={SignUpScreen}
        options={Header('ลงทะเบียน')}
      />
    </AuthStack.Navigator>
  )
}