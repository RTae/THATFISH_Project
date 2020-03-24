import * as React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, } from 'react-native'
import Logo from '../assets/images/icon.png'
import { TextInput } from 'react-native-gesture-handler'
import {FontAwesome5} from '@expo/vector-icons'
import { AuthContext } from "../components/context";

const {width : WIDTH} = Dimensions.get('window')

export default function LoginScreen({navigation}){
    const [Name, setName] = React.useState('');
    const { signIn } = React.useContext(AuthContext);

    return(
        <View style = {styles.container}>
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style = {styles.container} >
                        <View style = {styles.logoContainer}>
                            <Image source = {Logo} style = {styles.logo}/>
                            <Text style = {styles.logoText}>THATFISH</Text>
                        </View>

                        <View style = {styles.inputContainer}>
                            <TextInput 
                                    style = {styles.input}
                                    placeholder = {'name'}
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
                        <TouchableOpacity style = {styles.btnLogin}
                                        onPress = {() => signIn({Name})}>
                            <Text style = {styles.text}>START</Text>
                        </TouchableOpacity>

                        <View style = {styles.detailContainer}>
                            <Text style = {styles.detailA}>FROM</Text>
                            <Text style = {styles.detailB}>KMUTT</Text>
                        </View>

                </View>
            </KeyboardAvoidingView>
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
        marginBottom: 50,
    },

    detailContainer:{
        alignItems: 'center',
        marginTop: 80,
    },

    logo : {
        marginTop:80,
        width:300,
        height:300
    },

    logoText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
        opacity: 0.8,
    },
    input : {
        width: WIDTH - 55,
        height : 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,122,255,0.7)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left : 37,
    },
    inputContainer: {
        marginTop : 5,
    },
    btnEye : {
        position: 'absolute',
        top: 8,
        right: 37,
    },
    btnLogin: {
        width: WIDTH - 55,
        height : 45,
        borderRadius: 25,
        backgroundColor: '#1A1260',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 100
    },

    btnSign: {
        width: WIDTH - 55,
        height : 45,
        borderRadius: 25,
        backgroundColor: '#1F618D',
        justifyContent: 'center',
        marginTop: 20
    },

    text: {
        color : '#FFF',
        fontSize: 16,
        textAlign: 'center'
    },

    detailA:{
        color : 'black',
        fontSize : 15,
        fontWeight: "300",
    },

    detailB:{
        color : '#d78547',
        fontSize : 20,
        fontWeight: "bold",
    }
})