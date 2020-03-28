import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions, Image, View } from 'react-native';
import * as Font from 'expo-font'

const {width : WIDTH} = Dimensions.get('window')

export const Button = (props) => {
 
  const { title = 'Enter', onPress }  = props
  const [LoadFontState, setLoadFontState] = useState(false)

  useEffect(() =>{
    _loadFont()
  },[])

  const _loadFont = async () =>{
    await Font.loadAsync({
      Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
    })
    setLoadFontState(true)
  }

  if(LoadFontState){
    return (
      <TouchableOpacity style = {styles.btnLogin}
                        onPress = {onPress}>
          <View style = {styles.textContainer}>
            <Text style = {[styles.text, {fontFamily: 'Priyati'}]}>
              {props.title}
            </Text>
          </View>
      </TouchableOpacity>
    )
  }
  else{
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
}

const styles = StyleSheet.create({

  textContainer:{
    flex:0.6,
  },
  text: {
    color : '#FFF',
    fontSize: 35,
    textAlign: 'center'
  },
  btnLogin: {
    width: WIDTH - 60,
    height : 50,
    borderRadius: 25,
    backgroundColor: '#1A1260',
    justifyContent: 'center',
    marginTop: 25,
},
});
