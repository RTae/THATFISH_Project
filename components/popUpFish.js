import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import { StyleSheet, Image, View, Text } from 'react-native'


export const PopUpFish = (props) => {
 
    const { title, pic }  = props

    useEffect(() =>{
        _loadFont()
      },[])

    const _loadFont = async () =>{
        await Font.loadAsync({
          Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
          Nithan: require('../assets/fonts/Nithan.ttf')
        })
    }
  
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>{props.title}</Text>
            <Image
            style={{width: 200, height: 200}}
            source={{uri: props.pic}}
            /> 
            </View>
        </View>
    )
  }

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff', 
        flex: 1
    },

    titleContainer:{
        alignItems: 'center',
        marginTop: 20
    },

    textTitle:{
        fontSize:60,
        fontWeight:'500',
        fontFamily:'Nithan'
    }
})