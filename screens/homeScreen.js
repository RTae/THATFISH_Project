import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class homeScreen extends Component {

    constructor(props){
      super(props);

    }

    render(){
        return (
            <View style={styles.container}>
              <Text>Hello this is THATFISH App</Text>
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
