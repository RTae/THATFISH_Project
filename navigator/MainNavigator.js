import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen'
import FishsScreen from '../screens/FishsScreen'
import CalScreen from '../screens/CalScreen'

const Tab = createBottomTabNavigator();

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
        else if (route.name === 'Calculate') {
          iconName = focused ? 'cube' : 'fish';
          
        }

        // You can return any component that you like here!
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
                    component={FishsScreen} 
                    options = {{
                              title: 'FISHS',
                    }}/>
        <Tab.Screen name="Calculate" 
                    component={CalScreen} />
      </Tab.Navigator>
  );
}