import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, Platform, Dimensions, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import { Button } from '../components/Button'
import { SplashScreen } from './SplashScreen'
import { Firebase } from '../components/Firebase'

const {width : WIDTH} = Dimensions.get('window')

export const CalulateScreen = ({navigation,route}) => {

    const { nameFish } = route.params
    const { pic } = route.params
    const [Name, setName] = useState('');
    const [Age, setAge] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [Token, setToken] = useState('');
    const [FetchState, setFetchState]  = useState(true);

    useEffect(() =>{
      getData()
    },[])

    const onPressAccept = async (name,nameFeed,age,quantity,token) =>{
      setFetchState(false)
      var regexEng=/^[a-zA-Z]+$/
      var regexThai=/^[ก-๏\s]+$/
      if(nameFeed == '' || age == '' || quantity == ''){
        Alert.alert('กรุณาอย่าใส่ช่องว่าง')
        setFetchState(true)
      }else{
        if(quantity.match(regexEng) || quantity.match(regexThai) || age.match(regexEng) || age.match(regexThai)){
          Alert.alert('กรุณาอย่าใช้ตัวอักษรแทนจำนวนและอายุของปลา')
          setFetchState(true)
        }else{
          var log = await Firebase.calutlate(name,nameFeed,age,quantity,token)
          console.log(JSON.stringify(log))
          setFetchState(true)
          Alert.alert('เพิ่มข้อมูลสำเร็จ')
          navigation.goBack()
        }
      }
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@token')
        if(value == null) {
          console.log('Key : null')
        }
        else{
          console.log('Key : '+value)
          setToken(value)
        }
      } catch(e) {
        console.log(e)
      }
      console.log('Get Token done')
    }


    if(FetchState){
      return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style = {styles.container}>
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
                      source={{uri: pic}}
                    /> 
              </View>
              <View style={styles.titleContainer}>
                <View style={styles.text} >
                  <Text style={styles.textTitle}>{nameFish}</Text>
                </View>
              </View>
              
              <View style = {styles.inputContainer}>
                <View style = {styles.inputEach} >
                    <TextInput 
                        style = {[styles.input, {backgroundColor: '#AADFE6'}]}
                        placeholder = {'ชื่อบ่อ'}
                        placeholderTextColor = {'rgba(255, 255, 255, 0.9)'}
                        underlineColorAndroid = 'transparent'
                        value = {Name}
                        onChangeText={setName}
                    />
                    <FontAwesome5 name = 'fish'
                        size = {25} 
                        color = '#FFF'
                        style = {styles.inputIcon}/>
                </View>
                
                <View style = {styles.inputEach} >
                    <TextInput 
                        style = {[styles.input, {backgroundColor: '#79E0C3'}]}
                        placeholder = {'อายุปลา'}
                        placeholderTextColor = {'rgba(255, 255, 255, 0.9)'}
                        underlineColorAndroid = 'transparent'
                        value = {Age}
                        onChangeText={setAge}
                    />
                  <FontAwesome5 name = 'calendar-alt'
                      size = {26} 
                      color = '#FFF'
                      style = {styles.inputIcon}/>
                </View>
                
                <View style = {styles.inputEach} >
                  <TextInput 
                      style = {[styles.input, {backgroundColor: '#0390A0'}]}
                      placeholder = {'จำนวน'}
                      placeholderTextColor = {'rgba(255, 255, 255, 0.9)'}
                      underlineColorAndroid = 'transparent'
                      value = {Quantity}
                      onChangeText={setQuantity}
                  />
                  <FontAwesome5 name = 'box-open'
                      size = {23} 
                      color = '#FFF'
                      style = {styles.inputIcon}/>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                        title='ยืนยัน'
                        onPress={() => getData().then(() => {onPressAccept(nameFish,Name,Age,Quantity,Token)})}
                  />
                </View>
              </View>
          </View>
          </TouchableWithoutFeedback>
      )
  }else{
    return (
      <View style = {styles.container}>
        <SplashScreen/>
      </View>
    )
  } 
}



const styles = StyleSheet.create({
    container: {
      flex : 1,
      justifyContent : 'center',
      alignItems:'center',
      backgroundColor: '#FFF',
    },
    
    imageContainer:{
      marginTop:15,
      //backgroundColor:'yellow',
    },

    titleContainer:{
      //backgroundColor:'blue',

    },

    inputContainer: {
      //backgroundColor:'grey',

    },

    buttonContainer:{
      //backgroundColor:'red',
    },

    button:{
    },

    text:{
      marginTop:5,
    },

    inputEach:{
      margin:2,
    },

    image:{
      width: 300,
      height: 200,
      resizeMode: 'contain',
      borderRadius:100,
      borderWidth:2,
      borderColor:'black'
    },

    textTitle:{
      fontSize:80,
      fontFamily:'iannnnnVCD',
    },

    input : {
      marginTop:10,
      marginBottom:10,
      width: WIDTH - 55,
      height : 50,
      borderRadius: 25,
      fontSize: 35,
      alignItems:"center",
      paddingLeft: 45,
      color: 'rgba(255,255,255,0.7)',
      marginHorizontal: 25,
      fontFamily:'iannnnnVCD',
    },
    inputIcon: {
      position: 'absolute',
      top: 23,
      left : 37,
    },

  });