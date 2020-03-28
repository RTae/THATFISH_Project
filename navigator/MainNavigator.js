import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen'
import { FishScreen } from '../screens/FishsScreen'
import { CalculateStack } from '../navigator/CalculateStack'

const Tab = createBottomTabNavigator()

export const MainNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;
        let iconSize;

        if (route.name === 'Home') {
          iconName = focused ? 'home-circle' : 'home';
          iconSize = focused ? 45 : 25;

        } else if (route.name === 'Fishs') {
          iconName = focused ? 'view-list' : 'format-list-bulleted';
          iconSize = focused ? 45 : 25;

        }
        else if (route.name === 'Calculate') {
          iconName = focused ? 'cube' : 'fish';
          iconSize = focused ? 45 : 25;
          
        }
        return <MaterialCommunityIcons name={iconName} size={iconSize} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#1A1260',
      inactiveBackgroundColor: '#1A1260',
      showLabel:false
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
        <Tab.Screen name="Calculate" 
                    component={CalculateStack} />
      </Tab.Navigator>
  );
}