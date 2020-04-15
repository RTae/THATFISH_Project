import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions, Image, View } from 'react-native';
import * as Font from 'expo-font'

const {width : WIDTH} = Dimensions.get('window')

export const Button = (props) => {
 
  const { title = 'Enter', color = '#7FC3E8', onPress }  = props
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

    return (
      <View>
      {LoadFontState ? (
      <View>
        <TouchableOpacity style = {[styles.btnLogin, {backgroundColor: color}]}
                          onPress = {onPress}>
            <View style = {styles.textContainer}>
              <Text style = {[styles.text, {fontFamily: 'iannnnnVCD'}]}>
                {props.title}
              </Text>
            </View>
        </TouchableOpacity>
      </View>
      ):(
        <View>
          <TouchableOpacity style = {[styles.btnLogin, {backgroundColor: color}]}
                          onPress = {onPress}>
            <View style = {styles.textContainer}>
              <Text style = {styles.text}>
                {props.title}
              </Text>
            </View>
          </TouchableOpacity>
      </View>
      )}
      </View>
    )
}

const styles = StyleSheet.create({

  textContainer:{
  },

  text: {
    color : '#FFF',
    fontSize: WIDTH*0.095,
    textAlign: 'center',

  },
  btnLogin: {
    width: WIDTH - 60,
    height : 50,
    borderRadius: 25,
    justifyContent: 'center',
    marginTop: 25,
},
});
