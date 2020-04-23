import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import { Sheet } from './Sheet'
import { SplashScreen } from '../screens/SplashScreen'
import { StyleSheet, Image, View, Text, ScrollView, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextButton } from './TextButton'

const {width : WIDTH} = Dimensions.get('window')

export const PopUpFish = (props) => {
 
    const { title, pic, bio, eye, refercence }  = props
    const [LoadFontState, setLoadFontState] = useState(false)
    const [showBio, setshowBio] = useState(false)
    const [showEye, setshowEye] = useState(false)
    const [showTable, setshowTable] = useState(false)
    const [showRef, setshowRef] = useState(false)
    const [Ref, setRef] = useState(null)


    useEffect(() =>{
        _loadFont()
        stringTolist(props.refercence)
      },[])

    const _loadFont = async () =>{
        await Font.loadAsync({
          Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
          Nithan: require('../assets/fonts/Nithan.ttf'),
          iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
        })
        setLoadFontState(true)
    }

    const stringTolist = (string) => {
        var array = string.replace('[',' ').replace(']',' ').split(',')
        setRef(array)
    }
  
    return (
        <SafeAreaView style={styles.container}>
                {LoadFontState ? (
                <ScrollView horiztonal style={styles.container}>

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
                            <View style={styles.headerContainer}>
                                <TextButton
                                    width = {80}
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
                                    width = {190}
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
                                    width = {220}
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

                        <View style = {styles.RefContainer}>
                            <View style={styles.headerContainer}>
                                <TextButton
                                    width = {190}
                                    title = 'แหล่งที่มา'
                                    onPress = {() => setshowRef(!showRef)}
                                />
                            </View>
                            
                            <View style = {styles.RefInnerContainer}>
                            {showRef ? (                             
                                Ref.map((item , index ) => (
                                    <Text key = {index} style = {styles.TextRef}>{item}</Text>
                                ))                                
                            ):(
                                <View/>
                            )}
                            </View>
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
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7,
        elevation: 8
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
        marginTop:15,
    },

    infoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red',
        paddingLeft:30,
        paddingRight:30,
    },

    RefContainer:{
        flex:1,
    },

    RefInnerContainer:{
        paddingLeft:20,
        paddingRight:20,

    },

    TextRef:{
        fontSize:15,
        fontFamily:'Nithan',
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
        fontSize:WIDTH*0.2,
        fontFamily:'iannnnnVCD',
    },

    image:{
        width: 300,
        height: 200,
        resizeMode: 'contain',
        borderRadius:100,
        borderWidth:2,
        borderColor:'black',
        
    },
})