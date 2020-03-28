import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from '../screens/LoginScreen'
import { SignUpScreen } from '../screens/SignUpScreen'

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
        options={{
          headerShown: true,
          title: 'ลงทะเบียน',
          headerStyle: {
            backgroundColor: '#1A1260',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </AuthStack.Navigator>
  )
}