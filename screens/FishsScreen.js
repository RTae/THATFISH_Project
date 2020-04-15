import React, { useEffect, useReducer } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FishButton } from '../components/FishButton'
import { PopUpFish } from '../components/popUpFish'
import { Firebase } from '../components/Firebase'
import { Button } from '../components/Button'

const {width : WIDTH} = Dimensions.get('window')

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
            RefPopup: action.ref
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
      RefPopup: null,
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
      dispatch({ type: 'PATCH_DATA', title:data['name'], pic:data['pic'], bio:data['bio'] ,eye:data['idetity'], size:data['size'],ref:data['ref'] })
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
          <View style={styles.GroupOfButtonContrainer}>
          {
              data.map((item, index) => (
                <React.Fragment key = {item.id}>
                  <FishButton
                    title = {item.name}
                    onPress = {() => _popUp(item.id)}
                    pic = {item.icon}
                  />
                </React.Fragment>
              ))
            }
          </View>
        </ScrollView> 
        <View>  
        <Modal isVisible={state.PopupState}>
              <PopUpFish
                title = {state.TitlePopup}
                pic = {state.PicPopup}
                bio = {state.BioPopup}
                eye = {state.EyePopup}
                refercence = {state.RefPopup}
              />
              <View style = {{marginLeft:WIDTH*0.02}}>
              <Button 
                  title = 'ปิด'
                  onPress = {() => _popUp()}/>
              </View>
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

  ScorllListView: {
  },

  GroupOfButtonContrainer:{
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems: 'flex-start',
    marginHorizontal:1,
  }
});
