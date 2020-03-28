import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { PreCal } from '../screens/CalScreen'
import { Calulate } from '../screens/CallCalScreen'

const CalStack = createStackNavigator()

export const CalculateStack = () => {
  return (
    <CalStack.Navigator>
      <CalStack.Screen
        name='PreCal'
        component={PreCal}
        options={{
          headerShown: false,
        }}
      />

      <CalStack.Screen
        name='Calulate'
        component={Calulate}
        options={{
          headerShown: true,
          title: 'คำนวณปริมาณอาหาร',
          headerStyle: {
            backgroundColor: '#1A1260',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </CalStack.Navigator>
  )
}