import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import { SplashScreen } from '../screens/SplashScreen'
import { StyleSheet, Image, View, Text } from 'react-native'


export const PopUpFish = (props) => {
 
    const { title, pic, bio, eye }  = props
    const [LoadFontState, setLoadFontState] = useState(false)

    useEffect(() =>{
        _loadFont()
      },[])

    const _loadFont = async () =>{
        await Font.loadAsync({
          Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
          Nithan: require('../assets/fonts/Nithan.ttf')
        })
        setLoadFontState(true)
    }
  
    return (
        <View style={styles.container}>
            {LoadFontState ? (
                <View style={styles.titleContainer}>

                    <View>
                        <Text style={styles.textTitle}>{props.title}</Text>
                        <Image
                            style={styles.image}
                            source={{uri: props.pic}}
                        /> 
                    </View>

                    <View>
                        <Text>
                            {props.bio}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            {props.eye}
                        </Text>
                    </View>
                </View>
            ):(
                <SplashScreen/>
            )}
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
    },

    image:{
        width: 300,
        height: 200,
        resizeMode: 'contain'
    }
})