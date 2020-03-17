import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './homeStack'

export default function App() {
  return (
    <NavigationContainer><HomeStack/></NavigationContainer>
  );
}




