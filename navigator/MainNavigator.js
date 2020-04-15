import React from "react";
import { Image } from 'react-native'
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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
                    let iconSize;
                    if (route.name === 'Home') {
                      iconSize = focused ? 50 : 35;
                      return <Image source={require('../assets/images/HOME.png')} style={{width: iconSize, height: iconSize, resizeMode:'contain'}}/>
        
                    } else if (route.name === 'Fishs') {
                      iconSize = focused ? 50 : 35;
                      return <Image source={require('../assets/images/CAL.png')} style={{width: iconSize, height: iconSize, resizeMode:'contain'}}/>
        
                    }
                    else if (route.name === 'Calculate') {
                      iconSize = focused ? 50 : 35;
                      return <Image source={require('../assets/images/FISH.png')} style={{width: iconSize+20, height: iconSize, resizeMode:'contain'}}/>
                      
                    }
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'tomato',
                  inactiveTintColor: 'gray',
                  activeBackgroundColor: '#B5D572',
                  inactiveBackgroundColor: '#B5D572',
                  showLabel:false,
                  style: {
                    backgroundColor: '#B5D572',
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