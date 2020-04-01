import React, { useState, useEffect } from "react";
import { Card } from 'react-native-elements'
import * as Font from 'expo-font'
import { StyleSheet, Text, Dimensions} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { TextButton } from './TextButton'


const {width : WIDTH} = Dimensions.get('window')

export const CardFeedView = (props) =>{

  const { name, nameFeed, percent, day, quantity, food} = props
  const [LoadFontState, setLoadFontState] = useState(false)


  useEffect(() =>{
    _loadFont()
  },[])

  const _loadFont = async () =>{
    await Font.loadAsync({
      Layiji: require('../assets/fonts/Layiji.ttf'),
      iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
      Khianlen :  require('../assets/fonts/Khianlen.ttf'),
    }).then(()=>{
      setLoadFontState(true)
    })
  }

  return (
          <Card containerStyle = {styles.card}>
              <Text style = {styles.text}>
                    ชื่อบ่อ : {props.nameFeed}
              </Text>
              <Text style = {styles.text}>
                    ชื่อปลา : {props.name}
              </Text>
              <Text style = {styles.text}>
                    อายุปลา : {props.day}
              </Text>
              <ProgressBar progress={props.percent} color={'blue'} />
              <Text style = {styles.text}>
                    จำนวน : {props.quantity} ตัว
              </Text>
              <Text style = {styles.text}>
                    ปริมาณอาหารที่ให้ : {props.food} กรัม
              </Text>
              <TextButton
                Color = 'red'
                title = 'ลบ'
                logo = 'times'
              />
          </Card>
    )
  }

  const styles = StyleSheet.create({

    card:{
      shadowColor: "#000",
      shadowOffset: {
                    width: 0,
                    height: 5,
                    },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      marginBottom:5,
    },

    text: {
      color: 'black',
      fontSize: 40,
      fontFamily: 'iannnnnVCD',
      paddingLeft:13,
    }
})