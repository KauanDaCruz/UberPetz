import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import DriverInfo from './DriverInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default function App() {
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
    const driverName = 'Nome do Motorista';
    const estimatedCost = 25.00;
    setShowDriverInfo(true);
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
          <Marker coordinate={destination} title="Destino" />
        )}
      </MapView>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleClearDestination}
        >
          <Text style={styles.actionButtonText}>Limpar Destino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleRequestRide}
          disabled={!destination}
        >
          <Text style={styles.actionButtonText}>Solicitar Viagem</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShowUserLocation}
        >
          <Text style={styles.actionButtonText}>Mostrar Localização</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showDriverInfo}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <DriverInfo
            driverName="Nome do Motorista"
            estimatedCost={25.00}
            onCancel={() => setShowDriverInfo(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
