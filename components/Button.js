import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions, Image, View } from 'react-native';
import * as Font from 'expo-font'

const {width : WIDTH} = Dimensions.get('window')

export const Button = (props) => {
 
  const { title = 'Enter', onPress }  = props

  useEffect(() =>{
    _loadFont()
  },[])

  const _loadFont = async () =>{
    await Font.loadAsync({
      Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
    })
  }

  return (
    <TouchableOpacity style = {styles.btnLogin}
                      onPress = {onPress}>
        <View style = {styles.textContainer}>
          <Text style = {styles.text}>
            {props.title}
          </Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  textContainer:{
    flex:0.5,
  },
  text: {
    color : '#FFF',
    fontSize: 16,
    textAlign: 'center'
  },
  btnLogin: {
    width: WIDTH - 55,
    height : 45,
    borderRadius: 25,
    backgroundColor: '#1A1260',
    justifyContent: 'center',
    marginTop: 18,
},
});
