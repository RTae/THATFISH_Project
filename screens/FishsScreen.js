import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import { FishButton } from '../components/ิFishButton'
import { HeadFish } from '../components/HeaderFish'
import { PopUpFish } from '../components/popUpFish'
 

export const FishScreen = () => {

  const [FetchState, setFetchState] = useState(false)
  const [PopupState, setPopupState] = useState(false)
  const [DataObjs, setDataObjs] = useState(null)
  const [DataDicts, setDataDicts] = useState(null)
  const [TitlePopup, setTitlePopup] = useState(null)
  const [PicPopup, setPicPopup] = useState(null)
  const [BioPopup, setBioPopup] = useState(null)
  const [EyePopup, setEyePopup] = useState(null)
  const [SizePopup, setSizePopup] = useState(null)

  useEffect(() =>{
    _getFishDatas()
  },[])

  const _getFishDatas = async () => {
    return await fetch('https://thatfish.herokuapp.com/fishs')
    .then((response) => response.json())
    .then((responseJson) => {
      var datas = []
      for(var key in responseJson){
        var item = responseJson[key]
        item.id = key
        datas.push(responseJson[key])
       }
       setDataObjs(datas)
       setDataDicts(responseJson)
       setFetchState(true)
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  const _popUp = (id) => {
    var data = DataDicts[id]
    if(PopupState != true){

      setPicPopup(data['tableFeed'])
      setTitlePopup(data['name'])
      setPopupState(!PopupState)

    }
    else{
      setPopupState(!PopupState)

    }
    
  }
  if(FetchState){
    var data = DataObjs
    return (
      <View style={styles.container}>
        <HeadFish title = {'ประวัติและวิธีการเลี้ยง'} />
        <ScrollView style={styles.ScorllListView}>
          {
            data.map((item, index) => (
              <React.Fragment key = {item.id}>
                <FishButton
                  title = {item.name}
                  onPress = {() => _popUp(item.id)}
                />
              </React.Fragment>
            ))
          }
        </ScrollView> 
        <View>  
        <Modal isVisible={PopupState}
              onSwipeComplete = {() => _popUp()} 
              swipeDirection="left">
              <PopUpFish
                title = {TitlePopup}
                pic = {PicPopup}
              />
        </Modal>
        </View> 
      </View>
    );
  }
  else{
    return(
      <View style={styles.container}>
        <HeadFish title = {'ประวัติและวิธีการเลี้ยง'} />
        <View style={styles.containerLoadingIndicator} >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
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
