import React, { useState, useEffect, Component } from "react"
import * as Font from 'expo-font'
import {StyleSheet, View, Alert, Dimensions, KeyboardAvoidingView, Image, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import { AuthContext } from "../components/context"
import { Button } from '../components/Button'
import { SplashScreen } from './SplashScreen'
import { ResgiterPushNotification } from '../components/Module/registerForPushNotificationsAsync'

const {width : WIDTH} = Dimensions.get('window')

export const SignUpScreen = ({navigation}) => {

    const [Name, setName] = useState('');
    const [LoadFontState, setLoadFontState] = useState(false)
    const [ExpoToken, setExpoToken] = useState(false)
    const { signUp } = React.useContext(AuthContext);


    useEffect(() =>{
        let mounted = true;
        getExpoToken()
        Font.loadAsync({
            Layiji: require('../assets/fonts/Layiji.ttf'),
        }).then(() => {
            if(mounted){
                setLoadFontState(true)
            }
        })
        return () => mounted = false;
    },[])

    const getExpoToken = async () => {
        var token = await ResgiterPushNotification()
        console.log(token)
        setExpoToken(token)
    }

    const onPressRegister = async (Name) => {
        if(Name == ''){
            Alert.alert('กรุณาอย่าใส่ช่องว่าง')
        }else{
            var regexEng=/^[a-zA-Z]+$/
            var regexThai=/^[ก-๏\s]+$/
            if(Name.match(regexEng) || Name.match(regexThai)){
                data = {
                    'name':Name,
                    'token':ExpoToken
                }
                var log = await signUp(data)
                console.log(log)
                if(log == true){
                    Alert.alert('สมัครสมาชิกสำเร็จ')
                    navigation.goBack()
                }
                else if(log == 101){
                    Alert.alert('มีผู้ใช้ชื่อนี้แล้ว')
                }
    
                else if(log == 103){
                    Alert.alert('ERROR 103: User is not match the input')
                }
            }
            else{
                Alert.alert('ชื่อผู้ใช้ต้องเป็นตัวอักษรเท่านั้น')
            }
            
        }
        
    }

    return(
        <View style = {styles.container}>
        {LoadFontState ? (
                <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : null} style={{flex:1}} >
                    <SafeAreaView style={styles.container} >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style = {styles.container}>

                                <View style = {styles.logoContainer}>
                                    <Image source = {require('../assets/images/farm.png')} style = {styles.logo}/>
                                </View>

                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                            style = {styles.input}
                                            placeholder = {'ชื่อ'}
                                            placeholderTextColor = {'rgba(255, 255, 255, 0.9)'}
                                            underlineColorAndroid = 'transparent'
                                            value = {Name}
                                            onChangeText={setName}

                                    />
                                    <FontAwesome5 name = 'user'
                                        size = {26} 
                                        color = '#FFF'
                                        style = {styles.inputIcon}/>
                                </View>

                                <Button
                                    title = {'ลงทะเบียน'}
                                    onPress = {() => onPressRegister(Name)}
                                />
                                <View style={{ flex : 1 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
            </KeyboardAvoidingView>
        ):(
            <SplashScreen/>
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent: "flex-end",
        alignItems:'center',
        backgroundColor: '#FFF',
    },

    logoContainer:{
        marginTop:WIDTH*0.2,
        marginBottom:80,
        alignItems : 'center',
        justifyContent:'center',

    },

    logo : {
        width:200,
        height:200,
        borderRadius: 200 / 2,
        borderWidth:1,
        borderColor:'black',
        overflow: 'hidden'
    },

    input : {
        width: WIDTH - 55,
        height : 50,
        borderRadius: 25,
        fontSize: 35,
        alignItems:"center",
        paddingLeft: 45,
        backgroundColor: 'rgba(0,122,255,0.7)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        fontFamily:'iannnnnVCD',
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left : 37,
    },
    inputContainer: {
        marginTop : 10,
    },
    text: {
        color : '#FFF',
        fontSize: 16,
        textAlign: 'center'
    },
})