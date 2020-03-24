import React from "react";
import { View, StyleSheet, ActivityIndicator} from "react-native";

export default function SplashScreen() {
  return (
  <View style={styles.containerLoadingIndicator} >
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
  );
}

const styles = StyleSheet.create({
  containerLoadingIndicator: {
    flex: 1,
    justifyContent: 'center'
  }
});
