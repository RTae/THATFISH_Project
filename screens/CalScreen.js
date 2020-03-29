import React, { useState, useEffect, useReducer, useMemo } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native'
import * as Font from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FishButton } from '../components/ิFishButton'
import { Firebase } from '../components/Firebase'


export const PreCal = ({ navigation }) => {

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
      }
    },
    {
      FetchState: false,
      DataObjs: null,
      DataDicts: null,
    }
  );

  useEffect(() =>{
    getFishDatas()
    _loadFont()
  },[])

  const _loadFont = async () =>{
    await Font.loadAsync({
      Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
    })
  }

  const getFishDatas = async() => {
    var log = await Firebase.getFishDatas()
    var dataObjs = log[0]
    var dataDicts = log[1]
    dispatch({ type: 'FETCH_DONE', Objs:dataObjs, Dicts:dataDicts, FetchState:!state.FetchState })
  }

  const onPressFishButton = (id) => {
    navigation.navigate("Calulate")
  }

    if(state.FetchState){
      var data = state.DataObjs
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.ScorllListView}>
            {
              data.map((item, index) => (
                <React.Fragment key = {item.id}>
                  <FishButton
                    title = {item.name}
                    onPress = {() => onPressFishButton(item.id)}
                    pic = {item.pic}
                  />
                </React.Fragment>
              ))
            }
          </ScrollView> 
        </SafeAreaView>
      );
    }
    else{
      return(
        <SafeAreaView style={styles.container}>
          <View style={styles.containerLoadingIndicator} >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </SafeAreaView>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerLoadingIndicator: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 20,
    color : '#FFF',
    marginBottom: 10
  },
  logoContainer:{
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  logoText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.8,
  },
  ScorllListView: {
    marginHorizontal: 40,
  },
});
