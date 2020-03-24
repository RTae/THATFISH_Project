import React from 'react'
import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import Modal from 'react-native-modal';
import * as Font from 'expo-font'
import { FishButton } from '../components/ิFishButton'
import { HeadFish } from '../components/HeaderFish'
import { PopUpFish } from '../components/popUpFish'
 

export default class FishScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      fetchState: false,
      popupState:false,
      dataSource: null,
      responseJson: null,
      titlePopup: null,
      picPopup:null,
      bioPopup:null,
      eyePopup:null,
      sizePopup:null,
    }
  }

  componentDidMount(){
    this._getFishDatas()
    this._loadFont()
  }

  _loadFont = async () =>{
    await Font.loadAsync({
      Priyati: require('../assets/fonts/Priyati-Regular.ttf'),
    })
  }

  _getFishDatas = async () => {
    return await fetch('https://thatfish.herokuapp.com/fishs')
    .then((response) => response.json())
    .then((responseJson) => {
      var datas = []
      for(var key in responseJson){
        var item = responseJson[key]
        item.id = key
        datas.push(responseJson[key])
       }

      this.setState({
        fetchState: true,
        dataSource: datas,
        jsonDictDatas: responseJson
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  _popUp = (id) => {
    var data = this.state.jsonDictDatas[id]
    if(this.state.popupState != true){
      this.setState({
        popupState:!this.state.popupState,
        titlePopup:data['name'],
        picPopup:data['tableFeed']
      })
    }
    else{
      this.setState({
        popupState:!this.state.popupState,
      })
    }
    
  }

  render(){
    if(this.state.fetchState){
      var data = this.state.dataSource
      return (
        <View style={styles.container}>
          <HeadFish/>
          <View style={styles.FlastListView}>
            {
              data.map((item, index) => (
                <React.Fragment key = {item.id}>
                  <FishButton
                    title = {item.name}
                    onPress = {() => this._popUp(item.id)}
                  />
                </React.Fragment>
              ))
            }
          </View> 
          <View>  
          <Modal isVisible={this.state.popupState}
                onSwipeComplete = {() => this._popUp()} 
                swipeDirection="left">
                <PopUpFish
                  fontTitle = {'Priyati'}
                  title = {this.state.titlePopup}
                  pic = {this.state.picPopup}
                />
          </Modal>
          </View> 
        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <HeadFish/>
          <View style={styles.containerLoadingIndicator} >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  FlastListView: {
    marginHorizontal: 40,
  },
});
