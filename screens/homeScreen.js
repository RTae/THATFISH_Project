import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { AuthContext } from '../components/context'
import { Card, Header, Icon } from 'react-native-elements'

const {width : WIDTH} = Dimensions.get('window')

export default function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
      
      <View style = {styles.container} >
              <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    barStyle="light-content" // or directly
                    centerComponent={{ text: 'รายการปลาที่เลี้ยง', 
                                        style: { 
                                        color: '#fff',
                                        fontSize:20,
                                        fontWeight:'bold'
                                        } }}
                    containerStyle={{
                                backgroundColor: '#1A1260',
                                justifyContent: 'space-around',
                                }}/>
        <View style = {styles.logoContainer}>
          <Text style = {styles.logoText}>THATFISH</Text>
        </View>

        <TouchableOpacity style = {styles.btnLogin}
                          onPress = {signOut}>
          <Text style = {styles.text}>SIGNOUT</Text>
        </TouchableOpacity>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#FFF',
    },

    logoContainer:{
        alignItems: 'center',
    },

    logo : {
        width:200,
        height:200
    },

    logoText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.8,
    },

    logoText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.8,
    },
    btnLogin: {
        width: WIDTH - 55,
        height : 45,
        borderRadius: 25,
        backgroundColor: '#1A1260',
        justifyContent: 'center',
        marginTop: 20
    },

    btnSign: {
        width: WIDTH - 55,
        height : 45,
        borderRadius: 25,
        backgroundColor: '#1F618D',
        justifyContent: 'center',
        marginTop: 20
    },

    text: {
        color : '#FFF',
        fontSize: 16,
        textAlign: 'center'
    }
})