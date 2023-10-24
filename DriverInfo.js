import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const DriverInfo = ({ driverName, estimatedCost, onCancel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Informações do Motorista</Text>
      <Text>Nome do Motorista: {driverName}</Text>
      <Text>Estimativa de Custo: R$ {estimatedCost}</Text>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DriverInfo;
