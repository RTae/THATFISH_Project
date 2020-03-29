import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { FishScreen } from '../screens/FishsScreen'
import { Header } from '../components/Header'

const FishStack = createStackNavigator()

export const FishStackScreen = () => {
  return (
    <FishStack.Navigator>
      <FishStack.Screen
        name='Fish'
        component={FishScreen}
        options={Header('ประวัติและวิธีการเลี้ยง')}
      />
    </FishStack.Navigator>
  )
}