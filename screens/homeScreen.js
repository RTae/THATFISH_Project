import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import { StyleSheet, Text, View} from 'react-native';
import { AuthContext } from '../components/context'
import { HeadFish } from '../components/HeaderFish'
import { Button } from '../components/Button'

export const HomeScreen = () =>{

  useEffect(() =>{
    _loadFont()
  },[])

  const _loadFont = async () =>{
    await Font.loadAsync({
      Layiji: require('../assets/fonts/Layiji.ttf'),
    })
  }

  const { signOut } = React.useContext(AuthContext);

  return (
      <View style = {styles.container} >
        <HeadFish title = {'รายการปลาที่เลี้ยง'} />
        <View style = {styles.containerDetail}>
          <View style = {styles.logoContainer}>
            <Text style = {styles.logoText}>THATFISH</Text>
          </View>

          <Button
            title = {'SIGNOUT'}
            onPress = {signOut}
          />
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor: '#FFF',
    },

    containerDetail:{
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor: '#FFF',
    },

    logoContainer:{
        alignItems: 'center',
    },

    logo : {
        width:200,
        height:200
    },

    logoText: {
        color: 'black',
        fontSize: 80,
        fontWeight: '500',
        marginTop: 20,
        fontFamily: 'Layiji',
    },

    text: {
        color : '#FFF',
        fontSize: 16,
        textAlign: 'center'
    }
})