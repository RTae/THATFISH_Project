import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import {StyleSheet, View, Text, Image, Dimensions, KeyboardAvoidingView, Alert } from 'react-native'
import Logo from '../assets/images/icon.png'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import { AuthContext } from "../components/context";
import { Button } from '../components/Button';
import { SplashScreen } from '../screens/SplashScreen'
import { SafeAreaView } from 'react-native-safe-area-context';


const {width : WIDTH} = Dimensions.get('window')

export const LoginScreen = ({navigation}) => {

    const [Name, setName] = useState('');
    const [LoadFontState, setLoadFontState] = useState(false)
    const { signIn } = React.useContext(AuthContext);

    useEffect(() =>{
        _loadFont()
    },[])

    const _loadFont = async () =>{
      await Font.loadAsync({
        Layiji: require('../assets/fonts/Layiji.ttf'),
        Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
      })
      setLoadFontState(true)
      console.log()
    }

    const onPressLogin = (Name) =>{
        if(Name == ''){
            Alert.alert('กรุณาอย่าใส่ช่องว่าง')
        }
        else{
            signIn(Name)
        }
    }

    const onPressSigup = () =>{
        navigation.navigate('Register')
    }

    return(
        <SafeAreaView style = {styles.container}>
        {LoadFontState ? (
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style = {styles.container} >
                        <View style = {styles.logoContainer}>
                            <Image source = {Logo} style = {styles.logo}/>
                            <Text style = {styles.logoText}>THATFISH</Text>
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
                            title = {'เริ่ม'}
                            onPress = {() => onPressLogin(Name)}
                        />

                        <Button
                            title = {'ลงทะเบียน'}
                            onPress = {() => onPressSigup()} 
                        />

                        <View style = {styles.detailContainer}>
                            <Text style = {styles.detailA}>FROM</Text>
                            <Text style = {styles.detailB}>KMUTT</Text>
                        </View>

                </View>
            </KeyboardAvoidingView>
        ):(
            <SplashScreen/>
        )}
        </SafeAreaView>
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

    detailContainer:{
        alignItems: 'center',
        marginTop: 130,
    },

    logo : {
        width:350,
        height:250,
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
        fontSize: 25,
        alignItems:"center",
        paddingLeft: 45,
        backgroundColor: 'rgba(0,122,255,0.7)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        fontFamily:'Layiji',

    },
    inputIcon: {
        position: 'absolute',
        top: 10,
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

    detailA:{
        color : 'black',
        fontSize : 20,
        fontWeight: "300",
        fontFamily:'Layiji',
    },

    detailB:{
        color : '#d78547',
        fontSize : 20,
        fontWeight: "bold",

    }
})