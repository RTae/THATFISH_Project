import React, { useState, useEffect } from "react";
import { Card } from 'react-native-elements'
import * as Font from 'expo-font'
import { StyleSheet, Text, Dimensions, Alert, View} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { TextButton } from './TextButton'
import { FunctionContext } from '../components/context'
import { Firebase } from './Firebase'


const {width : WIDTH} = Dimensions.get('window')

export const CardFeedView = (props) =>{

  const { refresh } = React.useContext(FunctionContext);
  const { name, nameFeed, percent, day, quantity, food, id, token, count, dayleft} = props
  const [LoadFontState, setLoadFontState] = useState(false)


  useEffect(() =>{
    _loadFont()
  },[])

  const _loadFont = async () =>{
    await Font.loadAsync({
      Layiji: require('../assets/fonts/Layiji.ttf'),
      iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
      Khianlen :  require('../assets/fonts/Khianlen.ttf'),
    }).then(()=>{
      setLoadFontState(true)
    })
  }


  const onPressDel = (token,id) => {
    Alert.alert(
      'คุณแน่ใจนะว่าต้องการลบบ่อเลี้ยงอันนี้',
      '',
      [
      {text: 'ใช่', onPress: async () => {
        console.log('Yes')
        var log = await Firebase.delFishFeed(token,id)     
        console.log(log)     
        refresh()
        }
      },
      {text: 'ไม่', onPress: () => console.log('No')},
      ]
    )
  }

  return (
          <Card containerStyle = {styles.card}>
              <Text style = {styles.text}>
                    ชื่อบ่อ : {props.nameFeed}
              </Text>
              <Text style = {styles.text}>
                    ชื่อปลา : {props.name}
              </Text>
              <Text style = {styles.text}>
                    อายุปลา : {props.day} วัน
              </Text>
              <View style = {{justifyContent:'center',alignItems: 'center',marginTop:5,marginBottom:5, flexDirection:'row'}}>
                <ProgressBar progress={props.percent} color={'#0093ff'} style = {{width:WIDTH*0.68, height:10, borderRadius:10, borderWidth:2,}}/>
                <Text style = {{fontFamily:'iannnnnVCD',fontSize:25,paddingBottom:5,}} >  {props.percent * 100} %</Text>
              </View>
              <Text style = {styles.text}>
                    จำนวน : {props.quantity} ตัว
              </Text>
              <Text style = {styles.text}>
                    ปริมาณอาหารที่ให้ : {props.food} กรัม
              </Text>
              <Text style = {styles.text}>
                    จำนวนที่ให้ต่อวัน : {props.count} ครั้ง
              </Text>
              <TextButton
                Color = 'red'
                title = 'ลบ'
                width = {WIDTH*0.2}
                logo = 'times'
                onPress = {() => onPressDel(props.token,props.id)}
              />
          </Card>
    )
  }

  const styles = StyleSheet.create({

    card:{
      shadowColor: "#000",
      shadowOffset: {
                    width: 0,
                    height: 5,
                    },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      marginBottom:5,
      borderRadius:20,
      width:WIDTH*0.9,
      borderWidth:2,
      borderColor:'black',
      elevation:8,
    },

    text: {
      color: 'black',
      fontSize: WIDTH*0.09,
      fontFamily: 'iannnnnVCD',
      marginStart:10,
      marginTop:2.5,
      marginBottom:2.5,
    }
})