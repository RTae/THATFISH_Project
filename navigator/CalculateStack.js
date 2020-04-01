import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { PreCal } from '../screens/CalScreen'
import { CalulateScreen } from '../screens/CallCalScreen'
import { Header } from '../components/Header'


const CalStack = createStackNavigator()
const headerCal = Header('คำนวณปริมาณอาหาร')


export const CalculateStack = () => {
  return (
    <CalStack.Navigator>
      <CalStack.Screen
        name='PreCal'
        component={PreCal}
        options={headerCal}
      />

      <CalStack.Screen
        name='Calulate'
        component={CalulateScreen}
        options={headerCal}
      />
    </CalStack.Navigator>
  )
}