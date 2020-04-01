import React, { useState, useEffect, useReducer} from "react";
import { Card } from 'react-native-elements'
import * as Font from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, AsyncStorage,ScrollView,Dimensions} from 'react-native';
import { AuthContext } from '../components/context'
import { Button } from '../components/Button'
import { CardFeedView } from '../components/CardView'
import { Firebase } from '../components/Firebase'
import { TextButton } from '../components/TextButton'

const {width : WIDTH} = Dimensions.get('window')

export const HomeScreen = () =>{
  
  const { signOut } = React.useContext(AuthContext);
  const [Name, SetName] = useState('')
  const [Token, SetToken] = useState('')

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCH_DONE':
          return {
            ...prevState,
            DataObjs: action.Objs,
            DataDicts: action.Dicts,
            FetchState: action.FetchState,
          }
        case 'REFRESH':
          return {
            FetchState: action.FetchState,
            DataObjs: null,
            DataDicts: null
          }
      }
    },
    {
      FetchState: false,
      DataObjs: null,
      DataDicts: null,
    }
  );

  useEffect(() =>{
    _loadFont()
    getData()
    getFeedData()
  },[])

  const getData = async () => {
    try {
      const nameValue = await AsyncStorage.getItem('@name')
      const tokenValue = await AsyncStorage.getItem('@token')
      if(nameValue == null) {
        console.log('Key : null')
      }
      else{
        console.log('Key : '+nameValue)
        SetName(nameValue)
        SetToken(tokenValue)
      }
    } catch(e) {
      console.log(e)
    }
    console.log('Get Name done')
  }

  const _loadFont = async () =>{
    await Font.loadAsync({
      Layiji: require('../assets/fonts/Layiji.ttf'),
      iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
      Khianlen :  require('../assets/fonts/Khianlen.ttf'),
    })
  }

  const getFeedData = async () => {
    const token = await AsyncStorage.getItem('@token')
    var log = await Firebase.getFishFeed(token)
    if(log != null){
      var dataObjs = log[0]
      var dataDicts = log[1]
      dispatch({ type: 'FETCH_DONE', Objs:dataObjs, Dicts:dataDicts, FetchState:!state.FetchState })
    }
    else{
      dispatch({ type: 'FETCH_DONE', Objs:null, Dicts:null, FetchState:!state.FetchState })
    }
  }

  const onPressRefresh = async () =>{
    dispatch({ type: 'REFRESH', FetchState:false })
    const tokenValue = await AsyncStorage.getItem('@token')
    var log = await Firebase.getFishFeed(tokenValue)
    if(log != null){
      var dataObjs = log[0]
      var dataDicts = log[1]
      dispatch({ type: 'FETCH_DONE', Objs:dataObjs, Dicts:dataDicts, FetchState: true })
    }
    else{
      dispatch({ type: 'FETCH_DONE', Objs:null, Dicts:null, FetchState:!state.FetchState })
    }
  }

  const onPressSigOut = () => {
    signOut()
  }

  const HeaderTitle = () => {
    return (
      <View>
      <Card containerStyle = {styles.card}>
        <Text style = {styles.logoText}>
          ยินดีต้อนรับสู่ THAT FISH {Name}
        </Text>
        <Button
          title = 'ออกจากระบบ'
          onPress = {() => onPressSigOut()}
          />
      </Card>
      <View style = {styles.containerHeader}>
        <View style = {styles.containerTextList}>
          <Text style = {styles.text}>
              รายการ
          </Text>
        </View>
        <View style = {styles.containerButtonRefec}>
          <TextButton
            title = 'รีเฟรช'
            width = {100}
            logo = {'sync'}
            onPress = {()=>onPressRefresh()}
          />
        </View>
      </View>
      </View>
    )
  }

  return (
      <SafeAreaView style = {styles.container} >
        {state.FetchState && state.DataObjs != null ? (
            <View style = {styles.containerDetail}>
              <HeaderTitle/>
              <ScrollView style = {styles.containerScrollView}>
              {
                state.DataObjs.map((item, index) => (
                    <React.Fragment key = {item.id}>
                      <CardFeedView
                        name = {item.name}
                        nameFeed = {item.nameFeed}
                        percent = {item.Precent}
                        day = {item.age}
                        quantity = {item.quantity}
                        food = {item.food}
                      />
                      </React.Fragment>
                    ))
              }
              </ScrollView>
            </View>
        ):(          
        <View style = {styles.containerDetail}>
            <HeaderTitle/>
        </View>
        )}
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor: '#FFF',
    },

    containerDetail:{
      justifyContent:'center',
      alignContent: 'center',
      backgroundColor: '#FFF',
    },

    containerScrollView: {
      marginBottom:100,
    },

    containerHeader: {
      flexDirection:'row',
    },

    containerTextList:{
      marginTop:23,
    },

    containerButtonRefec:{
      marginLeft:WIDTH-WIDTH/2,
    },

    card:{
      shadowColor: "#000",
      shadowOffset: {
                    width: 0,
                    height: 5,
                    },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

    },

    logoText: {
        color: 'black',
        fontSize: 49,
        fontFamily: 'iannnnnVCD',
    },

    text: {
      color: 'black',
      fontSize: 42,
      fontFamily: 'iannnnnVCD',
      paddingLeft:13,
    }
})