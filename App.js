import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 16,
    backgroundColor: 'white',
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default function App() {
  const [currentLatitude, setCurrentLatitude] = useState('-23.9330843');
  const [currentLongitude, setCurrentLongitude] = useState('-46.3017265');
  const [errorMsg, setErrorMsg] = useState('');
  const [showMap, setShowMap] = useState(false);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setShowMap(true);
    } else {
      setShowMap(false);
      Alert.alert('Permissão de Localização', 'Você negou a permissão para acessar a localização em tempo real.');
    }
  };

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setCurrentLatitude(location.coords.latitude.toString());
    setCurrentLongitude(location.coords.longitude.toString());
  };

  useEffect(() => {
    if (showMap) {
      getLocation(); // Chama a função para obter a localização ao iniciar o mapa
    }
  }, [showMap]);

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Você está Aqui</Text>
      {showMap && (
        <>
          <Text style={styles.text}>Latitude: {currentLatitude}</Text>
          <Text style={styles.text}>Longitude: {currentLongitude}</Text>
        </>
      )}
      <View style={styles.button}>
        <Button title="Obter Localização" onPress={requestLocationPermission} />
      </View>
      {showMap && (
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} showsUserLocation={true} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

