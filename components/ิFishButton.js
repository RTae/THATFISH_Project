import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions, Image, View } from 'react-native';
import * as Font from 'expo-font'

const {width : WIDTH} = Dimensions.get('window')

export const FishButton = (props) => {
 
  const { title = 'Enter', onPress, pic }  = props
  const [ LoadState, setLoadState] = useState(false)

  useEffect(() =>{
    _loadFont()
  },[])

  const _loadFont = async () =>{
    await Font.loadAsync({
      iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf')
    }).then(() => {
      setLoadState(true)
    })
    
  }

  if(LoadState){
    return (
      <TouchableOpacity style = {styles.btnLogin}
                        onPress = {onPress}>
          <View style = {styles.picContainer}>
            <Image
                style={styles.image}
                source={{uri: props.pic}}
            />
          </View>
          <View style = {styles.textContainer}>
            <Text style = {styles.textFont}>
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
          <View style = {styles.picContainer}>
            <Image
                style={styles.image}
                source={{uri: props.pic}}
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
}

const styles = StyleSheet.create({

  picContainer:{
    flex:0.2,
  },

  textContainer:{
    flex:0.6,
    alignItems:'center',
    justifyContent: 'center',
    height: 70,
  },
  text: {
    color : '#FFF',
    fontSize: 30,
    textAlign: 'center',
  },

  textFont: {
    color : '#FFF',
    fontSize: 45,
    textAlign: 'center',
    fontFamily:'iannnnnVCD'
  },

  image:{
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  btnLogin: {
    width: WIDTH - 80,
    height : 80,
    borderRadius: 25,
    backgroundColor: '#0094C6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    flexDirection:'row'
  },
});
