import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView, Text } from 'react-native'

export default class CallCalScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text>
                    Hello this is CallCalScreen
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'

    },
    text: {
      flex: 1,
    },
  });