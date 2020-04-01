import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import * as Font from 'expo-font'

export const TextButton = (props) => {
 
  const { title = 'Enter', onPress, width, logo = 'caret-square-down', Color = 'black' }  = props
  const [LoadFontState, setLoadFontState] = useState(false)

  useEffect(() =>{
    let mounted = true;
    Font.loadAsync({
        iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
    }).then(() => {
        if(mounted){
            setLoadFontState(true)
        }
    })
    return () => mounted = false;
  },[])

  if(LoadFontState){
    return (
      <TouchableOpacity style = {[styles.btnLogin, { width: props.width}]}
                        onPress = {onPress}>
          <View style = {styles.textContainer}>
            <Text style = {[styles.text, {fontFamily: 'iannnnnVCD', color :  Color}]}>
              {props.title}
            </Text>

            <FontAwesome5 name = {logo}
                          size = {20} 
                          color = {Color}
                          style = {styles.inputIcon}/>
          </View>
      </TouchableOpacity>
    )
  }
  else{
    return (
      <TouchableOpacity style = {styles.btnLogin}
                        onPress = {onPress}>
          <View style = {styles.textContainer}>
            <Text style = {[styles.text , {color :  Color}]}>
              {props.title}
            </Text>
            <View style = {styles.inputIcon}>
            <FontAwesome5 name = 'caret-square-down'
                          size = {20} 
                          color = {Color}/>
            </View>
          </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  textContainer:{
    flex:1,
    flexDirection:'row',
  },
  text: {
    fontSize: 40,
    textAlign: 'center'
  },
  btnLogin: {
    height : 47,
    marginTop: 25,
  },

  inputIcon: {
      marginTop:10,
      marginLeft:5,
  },
});
