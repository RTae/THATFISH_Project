import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import {StyleSheet, View, Alert, Dimensions, KeyboardAvoidingView, } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import { AuthContext } from "../components/context";
import { Button } from '../components/Button';
import { SplashScreen } from '../screens/SplashScreen'

const {width : WIDTH} = Dimensions.get('window')

export const SignUpScreen = ({navigation}) => {

    const [Name, setName] = useState('');
    const [LoadFontState, setLoadFontState] = useState(false)
    const { signUp } = React.useContext(AuthContext);

    useEffect(() =>{
        _loadFont()
    },[])

    const _loadFont = async () =>{
      await Font.loadAsync({
        Layiji: require('../assets/fonts/Layiji.ttf'),
      })
      setLoadFontState(true)
    }

    const onPressRegister = async (Name) => {
        if(Name == ''){
            Alert.alert('กรุณาอย่าใส่ช่องว่าง')
        }else{
            var regexEng=/^[a-zA-Z]+$/
            var regexThai=/^[ก-๏\s]+$/
            if(Name.match(regexEng) || Name.match(regexThai)){
                var log = await signUp(Name)
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
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style = {styles.container} >

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
                </View>
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
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#FFF',
    },

    logoContainer:{
        alignItems: 'center',
        marginTop:50
    },


    logoText: {
        color: 'black',
        fontSize: 90,
        fontFamily:'Layiji',
        opacity: 1,
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
        marginTop : 5,
    },
    text: {
        color : '#FFF',
        fontSize: 16,
        textAlign: 'center'
    },
})