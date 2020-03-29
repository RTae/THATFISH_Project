import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import { Sheet } from './Sheet'
import { SplashScreen } from '../screens/SplashScreen'
import { StyleSheet, Image, View, Text, ScrollView, Platform} from 'react-native'
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
                <ScrollView horiztonal style={styles.container}>

                        <View style={styles.titleContainer}>
                            <Text style={styles.textTitle}>{props.title}</Text>
                        </View>
                        <View style={[styles.imageContainer, Platform.OS === 'ios' ? (
                            {
                                shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.30,
                            shadowRadius: 4.65,
                            }) :({
                                elevation: 8
                            })
                            ]}>
                            <Image
                                style={styles.image}
                                source={{uri: props.pic}}
                            /> 
                        </View>

                        <View style={styles.bioContainer}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.textHeader}>
                                    ประวัติความเป็นมา
                                </Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.textInfo}>
                                    {'      '+props.bio}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.eyeContainer}>
                            
                            <View style={styles.headerContainer}>
                                <Text style={styles.textHeader}>
                                    ลักษณะของปลา
                                </Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.textInfo}>
                                    {'      '+props.eye}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.sheetContainer}>
                            
                            <View style={styles.headerContainer}>
                                <Text style={styles.textHeader}>
                                    การให้อาหาร
                                </Text>
                            </View>
                            <Sheet name = {props.title}/>
                        </View>
                </ScrollView>
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
        //backgroundColor:'red',

    },

    eyeContainer:{
        flex:0.30,
        //backgroundColor:'green',
    },
    
    sheetContainer:{
        flex:0.50,
        //backgroundColor:'green',

    },

    headerContainer:{
        //backgroundColor:'red',
        paddingLeft:30,
        marginTop:20,
        marginBottom:5,
    },

    infoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red',
        paddingLeft:30,
        paddingRight:30,
    },

    textHeader:{
        fontSize:30,
        fontFamily:'Nithan',
    },

    textTitle:{
        fontSize:70,
        fontFamily:'Nithan',
    },

    image:{
        width: 300,
        height: 200,
        resizeMode: 'contain',

    },

    textInfo:{
        fontSize:20,
        fontFamily:'Nithan',
    },
})