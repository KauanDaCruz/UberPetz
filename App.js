import { StatusBar } from 'expo-status-bar';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
        return;
      }
      console.log("iodjoiqwdjwieo")
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text)
  }

  return (
    <View style={styles.container}>
    <Text>kauan doirmindo</Text>
    <MapView 
    provider={PROVIDER_GOOGLE} 
    style={styles.map}
    showsUserLocation={true}/> 
    <StatusBar style="auto" />
  </View>
  );
}
