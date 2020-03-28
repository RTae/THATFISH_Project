import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import { Header } from 'react-native-elements'

export const HeadFish = (props) =>{

    useEffect(() =>{
      _loadFont()
    },[])

    const _loadFont = async () =>{
      await Font.loadAsync({
        Layiji: require('../assets/fonts/Layiji.ttf'),
      })
    }

    const { title, leftComponent = null,pos = 'center' }  = props
    return (
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content"
        placement={props.pos}
        leftComponent={props.leftComponent}
        centerComponent={{ text: props.title, 
                          style: { 
                            color: '#fff',
                            fontSize:34,
                            fontFamily:'Layiji'
                          } }}
        containerStyle={{
          backgroundColor: '#1A1260',
          justifyContent: 'space-around',
        }}
      />
    )
}

