import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen'
import { FishScreen } from '../screens/FishsScreen'
import { PreCal } from '../screens/CalScreen'
import CallCalScreen from '../screens/CallCalScreen'

const Tab = createBottomTabNavigator()
const CalStack = createStackNavigator()

const CalStackScreen = () => {
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
        component={CallCalScreen}
        options={{
          headerShown: false,
        }}
      />
    </CalStack.Navigator>
  )
}

export default function MainNavigator({navigation}) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home-circle' : 'home';
        } else if (route.name === 'Fishs') {
          iconName = focused ? 'view-list' : 'format-list-bulleted';
        }
        else if (route.name === 'Cal') {
          iconName = focused ? 'cube' : 'fish';
          
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#1A1260',
      inactiveBackgroundColor: '#1A1260'
    }}
  >
        <Tab.Screen name="Home" 
                    component={HomeScreen} 
                    options = {{
                              title: 'Home',
                    }}/>
        <Tab.Screen name="Fishs" 
                    component={FishScreen} 
                    options = {{
                              title: 'FISHS',
                    }}/>
        <Tab.Screen name="Cal" 
                    component={CalStackScreen} />
      </Tab.Navigator>
  );
}