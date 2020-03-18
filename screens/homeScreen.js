import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { AuthContext } from '../components/context'

const {width : WIDTH} = Dimensions.get('window')

export default function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
      <View style = {styles.container} >
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
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#FFF',
    },

    logoContainer:{
        alignItems: 'center',
        marginBottom: 50,
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
    input : {
        width: WIDTH - 55,
        height : 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,122,255,0.7)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left : 37,
    },
    inputContainer: {
        marginTop : 20,
    },
    btnEye : {
        position: 'absolute',
        top: 8,
        right: 37,
    },
    btnLogin: {
        width: WIDTH - 55,
        height : 45,
        borderRadius: 25,
        backgroundColor: '#1F618D',
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