import React, { useState, useEffect, useReducer, useMemo } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FishButton } from '../components/ิFishButton'
import { PopUpFish } from '../components/popUpFish'
import { Firebase } from '../components/Firebase'
import { Button } from '../components/Button'

export const FishScreen = () => {

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
        case 'PATCH_DATA':
          return {
            ...prevState,
            TitlePopup: action.title,
            PicPopup: action.pic,
            BioPopup: action.bio,
            EyePopup: action.eye,
            SizePopup: action.size,
          }
        case 'POPUP':
          return {
            ...prevState,
            PopupState: action.state,
          }
      }
    },
    {
      FetchState: false,
      PopupState: false,
      DataObjs: null,
      DataDicts: null,
      TitlePopup: null,
      PicPopup: null,
      BioPopup: null,
      EyePopup: null,
      SizePopup: null,
    }
  );

  useEffect(() =>{
    getFishDatas()
  },[])

  const getFishDatas = async() => {
    var log = await Firebase.getFishDatas()
    var dataObjs = log[0]
    var dataDicts = log[1]
    dispatch({ type: 'FETCH_DONE', Objs:dataObjs, Dicts:dataDicts, FetchState:!state.FetchState })
  }

  const _popUp = (id) => {
    var data = state.DataDicts[id]
    if(state.PopupState != true){
      dispatch({ type: 'PATCH_DATA', title:data['name'], pic:data['pic'], bio:data['bio'] ,eye:data['idetity'], size:data['size'] })
      dispatch({ type: 'POPUP', state:!state.PopupState})

    }
    else{
      dispatch({ type: 'POPUP', state:!state.PopupState})
    }
    
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
                  onPress = {() => _popUp(item.id)}
                  pic = {item.pic}
                />
              </React.Fragment>
            ))
          }
        </ScrollView> 
        <View>  
        <Modal isVisible={state.PopupState}>
              <PopUpFish
                title = {state.TitlePopup}
                pic = {state.PicPopup}
                bio = {state.BioPopup}
                eye = {state.EyePopup}
              />
              <Button 
                  title = 'ปิด'
                  onPress = {() => _popUp()}/>
        </Modal>
        </View> 
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
  ScorllListView: {
    marginHorizontal: 40,
  },
});
