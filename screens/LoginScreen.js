import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'
import {StyleSheet, View, Text, Image, Dimensions, Alert } from 'react-native'
import {Card, Paragraph } from 'react-native-paper';
import Modal from 'react-native-modal';
import Logo from '../assets/images/logo.png'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import { AuthContext } from "../components/context";
import { Button } from '../components/Button';
import { SplashScreen } from './SplashScreen'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextButton } from '../components/TextButton'
import { SocialIcon } from 'react-native-elements'

const infoText = '  Application นี้เป็นส่วนหนึ่งของวิชา GEN111 KMUTT เราทำ Application นี้ขึ้นมาเพื่อให้ความรู้และความสะดวกสบายในการเลี้ยงปลาเกษตรมากขึ้น พวกเราหวังว่างานของพวกจะช่วยให้คนรุ่นใหม่เกิดความสนใจในการเลี้ยงปลาเกษตรเป็นอาชีพ โดย Application นี้จะปล่อยเป็น open source สำหรับผู้ที่ต้องการต่อยอดในอนาคต'

const {width : WIDTH} = Dimensions.get('window')
const {height : HEIGHT} = Dimensions.get('window')


export const LoginScreen = ({navigation}) => {

    const [Name, setName] = useState('');
    const [LoadFontState, setLoadFontState] = useState(false)
    const [ShowInfo, setShowInfo] = useState(false)
    const { signIn } = React.useContext(AuthContext);

    useEffect(() =>{
        let mounted = true;
        Font.loadAsync({
            iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
            Layiji: require('../assets/fonts/Layiji.ttf'),
            Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
        }).then(() => {
            if(mounted){
                setLoadFontState(true)
            }
        })
        return () => mounted = false;
    },[])

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

    const onPressShowInfo = () => {
        setShowInfo(!ShowInfo)
    }

    return(
        <SafeAreaView style = {styles.container}>
        {LoadFontState ? (
            <View>
                <View style = {styles.container} >
                        <View style = {styles.logoContainer}>
                            <Image source = {Logo} style = {styles.logo}/>
                            <Text style = {styles.logoText}>THATFISH</Text>
                        </View>

                        <View style = {styles.inputContainer}>
                            <TextInput 
                                    style = {styles.input}
                                    placeholder = {'ชื่อ'}
                                    placeholderTextColor = {'rgba(255, 255, 255, 1)'}
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
                            color = '#0390A0'
                            onPress = {() => onPressLogin(Name)}
                        />

                        <Button
                            title = {'ลงทะเบียน'}
                            color = '#236734'
                            onPress = {() => onPressSigup()} 
                        />
                </View>
                <View style = {{flexDirection:'row'}}>
                    <View style = {styles.detailContainer}>
                        <Text style = {styles.detailA}>FROM</Text>
                        <Text style = {styles.detailB}>KMUTT</Text>
                    </View>
                    <View style = {{marginTop: WIDTH*0.25,marginLeft:WIDTH*0.3}}>
                        <TextButton
                            title = ''
                            width = {40}
                            logo = {'exclamation-circle'}
                            onPress = {()=>onPressShowInfo()}
                            Color = {'#d78547'}
                        />
                    </View>
                </View>
                <View >  
                <Modal isVisible={ShowInfo}>
                    <View style = {{justifyContent: "flex-end",alignItems:'center',}}>  
                        <Card style = {{height:HEIGHT*0.4,width:WIDTH*0.9, borderRadius:20,}}>
                            <Card.Title title="About us"/>
                            <Card.Content>
                                <Paragraph style = {{fontFamily:'iannnnnVCD',fontSize:25}}>
                                        {infoText}
                                </Paragraph>
                            </Card.Content>
                            <Card.Title title="Support us"/>
                            <View style = {{flexDirection:'row'}}>
                                <SocialIcon
                                    style = {{height:30,width:30,marginLeft:15}}
                                    iconSize = {30}
                                    raised={true}
                                    type='github'
                                    />
                                <Paragraph style = {{fontFamily:'iannnnnVCD',fontSize:25,paddingLeft:15,marginTop:10,}}>
                                    https://github.com/RTae
                                </Paragraph>
                            </View>
                        </Card>
                        <Button 
                            title = 'ปิด'
                            onPress = {() => onPressShowInfo()}/>
                    </View >  
                </Modal>
                </View> 
            </View>
        ):(
            <SplashScreen/>
        )}
        </SafeAreaView>
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
        alignItems : 'center',
        justifyContent:'center',
        marginBottom:WIDTH*0.1,
    },

    detailContainer:{
        alignItems: 'center',
        marginTop: WIDTH*0.25,
        marginLeft:WIDTH*0.4
    },

    logo : {
        width:200,
        height:200,
        overflow:'hidden'
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
        backgroundColor: '#7FC3E8',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        fontFamily:'iannnnnVCD',

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