import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from '../screens/homeScreen'


const Stack = createStackNavigator();

function homeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: true }}
    >
      <Stack.Screen
        name="Home"
        component={homeScreen}
      />
    </Stack.Navigator>
  );
}

export default homeStack;