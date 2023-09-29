import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import DriverInfo from './DriverInfo'; // Importe o componente DriverInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // ... outros estilos
});

export default function App() {
  const [destination, setDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showDriverInfo, setShowDriverInfo] = useState(false);

  useEffect(() => {
    // ... código anterior para obter a localização do usuário
  }, []);

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    // Quando o usuário clica no mapa, definimos a localização de destino
    setDestination({ latitude, longitude });
  };

  const handleRequestRide = () => {
    // Quando o usuário solicita a viagem, você pode definir as informações do motorista e custo da viagem
    // Isso é apenas um exemplo, você deve obter esses dados de onde quer que eles venham
    const driverName = 'Nome do Motorista';
    const estimatedCost = 25.00; // Altere para a estimativa real

    setShowDriverInfo(true);
  };

  const handleClearDestination = () => {
    setDestination(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={handlePress}
        initialRegion={{
          latitude: -23.9330843, // Latitude inicial
          longitude: -46.3017265, // Longitude inicial
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marcador para a localização atual */}
        {userLocation && (
          <Marker coordinate={userLocation}>
            {/* ... */}
          </Marker>
        )}

        {/* Marcador para o local de destino */}
        {destination && (
          <Marker coordinate={destination}>
            {/* ... */}
          </Marker>
        )}
      </MapView>

      {/* Interface de ação */}
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
          disabled={!destination} // Desabilita o botão se não houver destino definido
        >
          <Text style={styles.actionButtonText}>Solicitar Viagem</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de informações do motorista e custo da viagem */}
      <Modal
        visible={showDriverInfo}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <DriverInfo
            driverName="Nome do Motorista"
            estimatedCost={25.00} // Altere para a estimativa real
            onCancel={() => setShowDriverInfo(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
