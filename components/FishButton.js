import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions, Image, View, ImageBackground } from 'react-native';
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
        <ImageBackground source={require('../assets/images/Frame.png')} style={styles.Frame}>
              <Image
                  style={styles.image}
                  source={{uri: props.pic}}
              />
          </ImageBackground>
          <ImageBackground source={require('../assets/images/FrameText.png')} style={styles.TextFrame}>
            <Text style = {styles.textFont}>
              {props.title}
            </Text>
          </ImageBackground>
      </TouchableOpacity>
    )
  }
  else{
    return (
      <TouchableOpacity style = {styles.btnLogin}
                        onPress = {onPress}>
        <ImageBackground source={require('../assets/images/Frame.png')} style={styles.Frame}>
              <Image
                  style={styles.image}
                  source={{uri: props.pic}}
              />
          </ImageBackground>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  textContainer:{
    flex:0.3,
    alignItems:'center',
    justifyContent: 'center',
    height: 70,
  },
  text: {
    color : '#000',
    fontSize: 20,
    textAlign: 'center',
  },

  textFont: {
    color : '#000',
    fontSize: WIDTH*0.07,
    textAlign: 'center',
    fontFamily:'iannnnnVCD'
  },

  image:{
    marginTop:20,
    width: 110,
    height: 110,
    resizeMode: 'contain'
  },

  TextFrame:{
    marginTop:5,
    width: WIDTH*0.49,
    height:40,
    alignItems:'center',
    resizeMode: 'cover',
  },

  Frame:{
    width:150,
    height:150,
    resizeMode: 'contain',
    alignItems:'center',
  },

  btnLogin: {
    height : 155,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});
