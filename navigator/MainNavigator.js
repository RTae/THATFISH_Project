import React from "react";
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeStackScreen } from '../navigator/HomeStack'
import { FishStackScreen } from '../navigator/FishStack'
import { CalculateStack } from '../navigator/CalculateStack'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();

export const MainNavigator = ({navigation}) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name ='Main'
                        options = {{
                          headerShown:false
                        }}
          >
              {() =>(
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
                  showLabel:false,
                  style: {
                    backgroundColor: '#1A1260',
                  }
                }}
              >
                    <Tab.Screen name="Home" 
                                component={HomeStackScreen}/>
                    <Tab.Screen name="Fishs" 
                                component={FishStackScreen}/>
                    <Tab.Screen name="Calculate" 
                                component={CalculateStack} />
                  </Tab.Navigator>
              )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}