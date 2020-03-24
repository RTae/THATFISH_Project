import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'


export const PopUpFish = (props) => {
 
    const { title, pic, fontTitle }  = props
  
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={[styles.textTitle,{fontFamily:props.fontTitle}]}>{props.title}</Text>
            <Image
            style={{width: 200, height: 200}}
            source={{uri: props.pic}}
            /> 
            </View>
        </View>
    )
  }

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff', 
        flex: 1
    },

    titleContainer:{
        alignItems: 'center',
        marginTop: 20
    },

    textTitle:{
        fontSize:60,
        fontWeight:'normal',
    }
})