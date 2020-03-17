import React, {Compoent} from 'react'
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView} from 'react-native'
import Logo from '../assets/images/icon.png'
import { TextInput, } from 'react-native-gesture-handler'
import {FontAwesome5} from '@expo/vector-icons'

const {width : WIDTH} = Dimensions.get('window')
export default class LoginScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = { 
            showPass: true,
            press: false,
            email: '',
            password: '',
            authentication: false,
            id: '',
        }

    }

    renderCurrentState = () => {
        if(this.state.authentication){
            return(
                <View style = {styles.container} >
                    <ActivityIndicator size = 'large' />
                </View>
            )
        }
        return(
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style = {styles.container} >
                        <View style = {styles.logoContainer}>
                            <Image source = {Logo} style = {styles.logo}/>
                            <Text style = {styles.logoText} >Mobius</Text>
                        </View>

                        <View style = {styles.inputContainer}>
                            <TextInput 
                                    style = {styles.input}
                                    placeholder = {'email'}
                                    placeholderTextColor = {'rgba(255, 255, 255, 0.9)'}
                                    underlineColorAndroid = 'transparent'
                                    value = {this.state.email}
                                    onChangeText={email => this.setState({email})}

                            />
                            <FontAwesome5 name = 'user'
                                size = {26} 
                                color = '#FFF'
                                style = {styles.inputIcon}/>
                        </View>

                <View style = {styles.inputContainer}>
                            <TextInput 
                                    style = {styles.input}
                                    placeholder = {'password'}
                                    secureTextEntry = {this.state.showPass}
                                    placeholderTextColor = {'rgba(255, 255, 255, 0.9)'}
                                    underlineColorAndroid = 'transparent'
                                    value = {this.state.password}
                                    onChangeText = {password => this.setState({password})}
                            />
                            <FontAwesome5 name = 'key'
                                        size = {26} 
                                        color = '#FFF'
                                        style = {styles.inputIcon}/>
                            
                            <TouchableOpacity style = {styles.btnEye}
                                            onPress= {this.showPass.bind(this)}>
                                <FontAwesome5 name = {this.state.press == false ? 'eye' : 'eye-slash'}
                                            size = {26}
                                            color = '#FFF'/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style = {styles.btnLogin}
                                        onPress = {this.onPressSignIn.bind(this)}>
                            <Text style = {styles.text}>LOGIN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.btnLogin}
                                        onPress = {this.onPressSignUp.bind(this)}>
                            <Text style = {styles.text}>SIGN UP</Text>
                        </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

    onPressSignIn =  async () => {

        if(this.state.email == '' || this.state.password == ''){
            alert('Enter email and password')
        }
        else{

            this.setState({
                authentication:true
            })

            this.setState({
                id: key
            })
        
            if(this.state.id != ''){
                this.setState({
                    authentication:false
                })
            }
        }

    }
    
    onPressSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }
    
    showPass = () => {
        if (this.state.press == false){
            this.setState({ showPass: false, press: true})
        }
        else{
            this.setState({ showPass: true, press: false})
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                {this.renderCurrentState()}
            </View>
        )
    }
}

LoginScreen.navigationOptions = {
    header: null,
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

    logo : {
        width:200,
        height:120
    },

    logoText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.8,
    },

    logoText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
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
        marginTop : 20,
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
        backgroundColor: '#1F618D',
        justifyContent: 'center',
        marginTop: 20
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
    }
})