import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import { Sheet } from './Sheet'
import { SplashScreen } from '../screens/SplashScreen'
import { StyleSheet, Image, View, Text, ScrollView, Platform} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextButton } from './TextButton'


export const PopUpFish = (props) => {
 
    const { title, pic, bio, eye }  = props
    const [LoadFontState, setLoadFontState] = useState(false)
    const [showBio, setshowBio] = useState(false)
    const [showEye, setshowEye] = useState(false)
    const [showTable, setshowTable] = useState(false)

    useEffect(() =>{
        _loadFont()
      },[])

    const _loadFont = async () =>{
        await Font.loadAsync({
          Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
          Nithan: require('../assets/fonts/Nithan.ttf'),
          iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
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
                                <TextButton
                                    width = {70}
                                    title = 'ประวัติ'
                                    onPress = {() => setshowBio(!showBio)}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                {showBio ? (
                                <Text style={styles.textInfo}>
                                    {'      '+props.bio}
                                </Text> 
                                ):(
                                    <View/>
                                )}
                            </View>
                        </View>

                        <View style={styles.eyeContainer}>
                            
                            <View style={styles.headerContainer}>
                                <TextButton
                                    width = {150}
                                    title = 'ลักษณะของปลา'
                                    onPress = {() => setshowEye(!showEye)}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                {showEye ? (
                                <Text style={styles.textInfo}>
                                    {'      '+props.eye}
                                </Text>
                                ):(
                                    <View/>
                                )}
                            </View>
                        </View>
                        <View style={styles.sheetContainer}>
                            <View style={styles.headerContainer}>
                                <TextButton
                                    width = {190}
                                    title = 'ตารางการให้อาหาร'
                                    onPress = {() => setshowTable(!showTable)}
                                />
                            </View>
                            {showTable ? (
                                <Sheet name = {props.title}/>
                            ):(
                                <View/>
                            )}
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
        paddingLeft:27,
    },

    infoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red',
        paddingLeft:30,
        paddingRight:30,
    },

    textHeader:{
        fontSize:40,
        fontFamily:'iannnnnVCD',
    },

    textInfo:{
        fontSize:23,
        fontFamily:'Nithan',
    },

    textTitle:{
        fontSize:100,
        fontFamily:'iannnnnVCD',
    },

    image:{
        width: 300,
        height: 200,
        resizeMode: 'contain',

    },
})