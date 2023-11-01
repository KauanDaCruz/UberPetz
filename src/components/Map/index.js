import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import DriverInfo from '../../../DriverInfo';
import { styles } from '../../../styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../config';
import Search from '../Search';
import Details from '../Details';
import MapViewDirections from 'react-native-maps-directions';


export default function Map(){
    const origin = {latitude: -23.969469399999998, longitude: -46.19449866212158};
    const testedestino = {latitude: -23.953318446551037, longitude: -46.17332136255494};
    const [destination, setDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showDriverInfo, setShowDriverInfo] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão de localização não concedida');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
    })();
  }, []);

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setDestination({ latitude, longitude });
  };

  const handleRequestRide = () => {
    if (destination) {
      const latitude = destination.latitude;
      const longitude = destination.longitude;
      const label = 'Destino'; // Nome do local de destino

      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place=${label}`;
      Linking.openURL(url);
    } else {
      // Trate o caso em que nenhum destino tenha sido definido
      // Você pode exibir uma mensagem de erro, por exemplo.
    }
  };

  const handleClearDestination = () => {
    setDestination(null);
  };

  const handleShowUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUserLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={handlePress}
        showsUserLocation
        initialRegion={{
          latitude: -23.9330843,
          longitude: -46.3017265,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        
        {userLocation && (
          <Marker coordinate={userLocation} title="Sua Localização" />
        )}

        {destination && (
          <MapViewDirections
          origin={userLocation}
          destination={destination}
          apikey={config.GoogleApi}
          strokeWidth={3}
          strokeColor="blue"
        />
        )}
      </MapView>
      {destination ? (
        <Details/>
      ) : (
          <Search/>
        )}

      

      <Modal
        visible={showDriverInfo}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <DriverInfo
            driverName="Felipe"
            estimatedCost={25.00}
            onCancel={() => setShowDriverInfo(false)}
          />
        </View>
      </Modal>

      
    </View>
  );
}