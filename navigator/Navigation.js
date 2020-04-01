import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Alert, AsyncStorage} from 'react-native';
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../components/context'
import { SplashScreen } from '../screens/SplashScreen'
import { MainNavigator } from '../navigator/MainNavigator'
import { AuthenticationStack } from '../navigator/AuthStack'
import { Firebase } from '../components/Firebase'

const Stack = createStackNavigator();

export default function Navigation({ navigation }) {

  const [LoadFontState, setLoadFontState] = useState(false)

  useEffect( () => {
    _loadFont()
    getData()
  }, [])

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORING_TOKEN':
          return {
            ...prevState,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'STILL_SININ':
          return {
            ...prevState,
            isLoading: true,
          }
        case 'SUCESS_SININ':
          return {
            ...prevState,
            isLoading: false,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const _loadFont = async () =>{
    await Font.loadAsync({
      Layiji: require('../assets/fonts/Layiji.ttf'),
      iannnnnVCD: require('../assets/fonts/iannnnnVCD.ttf'),
      Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
    }).then(() => {
      setLoadFontState(true)
    })
  }


  const storeData = async (token,name) => {
    try {
      await AsyncStorage.setItem('@token', token)
      await AsyncStorage.setItem('@name', name)
    } catch (e) {
      console.log(e)
    }
    console.log('Store token and name done')

  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value == null) {
        console.log('Key : null')
        dispatch({ type: 'RESTORING_TOKEN'});
      }
      else{
        console.log('Key : '+value.toString())
        dispatch({ type: 'SUCESS_SININ'});
        dispatch({ type: 'SIGN_IN', token: value });
      }
    } catch(e) {
      console.log(e)
    }
    console.log('Get token done')
  }

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@token')
    } catch(e) {
      console.log(e)
    }
  
    console.log('Remove token done')
  }

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'STILL_SININ'})
        var user = await Firebase.signIn(data)
        dispatch({ type: 'SUCESS_SININ'})
        console.log()
        if (user == 404){ 
          Alert.alert('ไม่พบผู้ใช้')
        }
        else{
          var token = user.token
          var name = user.name
          storeData(token,name)
          dispatch({ type: 'SIGN_IN', token: token })
          console.log()
        }
      },
      signOut: () => { 
        removeValue()
        dispatch({ type: 'SIGN_OUT' })
      },

      signUp: async (data) => {
        dispatch({ type: 'STILL_SININ'})
        var user = await Firebase.Register(data)
        dispatch({ type: 'SUCESS_SININ'})
        if (user == 101){
          return 101
        }
        else if(user == 103){
          return 103
        }
        else{
          return true
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>

          {state.isLoading && LoadFontState ? (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false,}} />
            </Stack.Navigator>
          </NavigationContainer>
          ) : state.userToken == null ? (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Auth"
                component={AuthenticationStack}
                options={{
                  headerShown: false,
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          ) : (
            <MainNavigator/>
          )}
    </AuthContext.Provider>
  );
}