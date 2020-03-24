import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native'
import { Button } from '../components/Button'

export const Calulate = ({navigation}) => {
    return(
        <View style = {styles.container}>
           <Button
                title='back'
                onPress={() => navigation.goBack()}
           />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor: '#FFF',
    },
    
    text: {
      flex: 1,
    },
  });