import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native'
import * as Font from 'expo-font'
import { FishButton } from '../components/ิFishButton'
import { HeadFish } from '../components/HeaderFish'
 

export const PreCal = ({ navigation }) => {

  const [FetchState, setFetchState] = useState(false)
  const [DataSource, setDataSource] = useState(null)

  useEffect(() =>{
    _getFishDatas()
    _loadFont()
  },[])

  const _loadFont = async () =>{
    await Font.loadAsync({
      Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
    })
  }

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
      setDataSource(datas)
      setFetchState(true)
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  const _popUp = (id) => {
    navigation.navigate("Calulate")
  }

    if(FetchState){
      var data = DataSource
      return (
        <View style={styles.container}>
          <HeadFish title = {'คำนวณปริมาณอาหาร'} />
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
        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <HeadFish title = {'คำนวณปริมาณอาหาร'} />
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
