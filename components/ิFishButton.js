import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions, Image, View } from 'react-native';
import * as Font from 'expo-font'

const {width : WIDTH} = Dimensions.get('window')

export const FishButton = (props) => {
 
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
        <View style = {styles.picContainer}>
          <Image
              style={styles.image}
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
        </View>
        <View style = {styles.textContainer}>
          <Text style = {styles.text}>
            {props.title}
          </Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  picContainer:{
    flex:0.1,
  },

  textContainer:{
    flex:0.7,
  },
  text: {
    color : '#FFF',
    fontSize: 16,
    textAlign: 'center'
  },
  image:{
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  btnLogin: {
    width: WIDTH - 80,
    height : 80,
    borderRadius: 25,
    backgroundColor: '#1A1260',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    flexDirection:'row'
  },
});
