import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { styles } from "../styles";


export default function TiposDeCadastros() {
    return (
        <View style={Cadastros.container}>
            <StatusBar hidden/>

        <View style={Cadastros.estilo}>
        <Image 
            source={require('../assets/uberx.png')}
            style={Cadastros.Motorista}
             />
            
            <Image 
            source={require('../assets/Passageiro.png')}
            style={Cadastros.Passageiro}
            />
        </View>
            
            
            
            
        </View>
    )
}

const Cadastros = StyleSheet.create({
    container: {
        flex: 1,
        display:'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        
    },
    estilo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'space-around',
        alignItems: 'center',
 
    },
    Motorista:{
        width:100,
        height:100,
    
    },
    Passageiro:{
        width:100,
        height:100,
        
    },


    
});