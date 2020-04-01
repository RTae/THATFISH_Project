import React, { useState, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from '../screens/HomeScreen'
import { Header } from '../components/Header'
import * as Font from 'expo-font'
import { SplashScreen } from '../screens/SplashScreen'

const HomeStack = createStackNavigator()

export const HomeStackScreen = () => {
  const [LoadFontState, setLoadFontState] = useState(false)

  useEffect( () => {
    _loadFont()
  }, [])

  const _loadFont = async () =>{
    await Font.loadAsync({
      iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
      Layiji: require('../assets/fonts/Layiji.ttf'),
      Khianlen :  require('../assets/fonts/Khianlen.ttf'),
    }).then(()=>{
      setLoadFontState(true)
    })
  }


  return (
    <HomeStack.Navigator>
      {LoadFontState ? (
      <HomeStack.Screen
              name='Home'
              component={HomeScreen}
              options={Header('รายการปลาที่เลี้ยง')}
      />
      ):(
        <HomeStack.Screen
        name='Home'
        component={HomeScreen}
        />
      )}
    </HomeStack.Navigator>
  )
}