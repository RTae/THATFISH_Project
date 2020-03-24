import React from 'react';
import { Header } from 'react-native-elements'

export const HeadFish = (props) =>{
    const { title }  = props
    return (
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content"
        centerComponent={{ text: props.title, 
                          style: { 
                            color: '#fff',
                            fontSize:20,
                            fontWeight:'bold'
                          } }}
        containerStyle={{
          backgroundColor: '#1A1260',
          justifyContent: 'space-around',
        }}
      />
    )
}

