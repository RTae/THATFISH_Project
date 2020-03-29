import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import { SplashScreen } from '../screens/SplashScreen'
import { StyleSheet, Image, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <SafeAreaView style={styles.container}>
            {LoadFontState ? (
                <View style={styles.container}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.textTitle}>{props.title}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{uri: props.pic}}
                        /> 
                    </View>

                    <View style={styles.bioContainer}>
                        <Text style={styles.textBio}>
                            {'      '+props.bio}
                        </Text>
                    </View>

                    <View style={styles.eyeContainer}>
                        <Text style={styles.texteye}>
                            {'      '+props.eye}
                        </Text>
                    </View>
                </View>
            ):(
                <SplashScreen/>
            )}
        </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff', 
        flex: 1
    },

    titleContainer:{
        flex:0.09,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'blue',

    },

    imageContainer:{
        flex:0.25,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        //backgroundColor:'yellow',

    },

    bioContainer:{
        flex:0.30,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red',
        paddingLeft:20,
        paddingRight:20,

    },

    eyeContainer:{
        flex:0.30,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'green',
        paddingLeft:20,
        paddingRight:20,

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
    },

    textBio:{
        fontSize:20,
        fontFamily:'Nithan',
    },

    texteye:{
        fontSize:20,
        fontFamily:'Nithan',
    }
})