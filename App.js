import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import Map from './src/components/Map'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
import fireConfig, { db } from './firebase'
import AddData from './screens/RegistroPassageiro';
import { styles } from './styles';
import TiposDeCadastros from './screens/TiposDeCadastros';





const Stack = createNativeStackNavigator();




export default function App() {

  
  
  const app = initializeApp(fireConfig);
  const auth = getAuth(app);
 
 
  
  return (
    
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='TiposDeCadastros'>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="AddData" component={AddData} />
        <Stack.Screen name="TiposDeCadastros" component={TiposDeCadastros} />
        
        
      </Stack.Navigator>

      
      
      
      
    </NavigationContainer>

    
    
  );


 
}


