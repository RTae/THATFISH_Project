import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Card } from 'react-native-elements'
import * as Font from 'expo-font'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, AsyncStorage ,ScrollView,Dimensions} from 'react-native';
import { AuthContext, FunctionContext}  from '../components/context'
import { Button } from '../components/Button'
import { CardFeedView } from '../components/CardView'
import { Firebase } from '../components/Firebase'
import { TextButton } from '../components/TextButton'
import Constants from 'expo-constants';

const {width : WIDTH} = Dimensions.get('window')

export const HomeScreen = () =>{
  
  const { signOut } = React.useContext(AuthContext);
  const [Name, SetName] = useState('')
  const [Token, SetToken] = useState('')
  const [ExpoPushToen, SetExpoPushToen] = useState('')
  const [Notification, SetNotification] = useState('')

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
    registerForPushNotificationsAsync()
    _notificationSubscription = Notifications.addListener(_handleNotification);
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

  const _handleNotification = (notification) => {
    console.log(notification);
    SetNotification(notification)
  };

  sendPushNotification = async () => {
    const message = {
      to: ExpoPushToen,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      SetExpoPushToen(token )
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const onPressRefresh = async () =>{
    ModuleContext.refresh()
  }

  const onPressSigOut = () => {
    signOut()
  }

  const ModuleContext = useMemo(
    () => ({
      refresh  : async () => {
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
    }),
    []
  );


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
    <FunctionContext.Provider value={ModuleContext}>
        <SafeAreaView style = {styles.container} >
                    <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text>Origin: {Notification.origin}</Text>
                      <Text>Data: {JSON.stringify(Notification.data)}</Text>
                    </View>
                    <Button title={'Press to Send Notification'} onPress={() => sendPushNotification()} />
                  </View>
        </SafeAreaView>
      </FunctionContext.Provider>
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