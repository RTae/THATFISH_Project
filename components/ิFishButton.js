import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';

const {width : WIDTH} = Dimensions.get('window')

export const FishButton = (props) => {
 
  const { title = 'Enter', onPress }  = props

  return (
          <TouchableOpacity style = {styles.btnLogin}
                            onPress = {onPress}>
                            <Text style = {styles.text}>{props.title}</Text>
          </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color : '#FFF',
    fontSize: 16,
    textAlign: 'center'
  },
  btnLogin: {
    width: WIDTH - 80,
    height : 45,
    borderRadius: 25,
    backgroundColor: '#1A1260',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  scrollView: {
    marginHorizontal: 40,
  },
});
