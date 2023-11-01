import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, Linking } from 'react-native';

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText
} from "./styles";

import uberx from "../../../assets/uberx.png";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDestinationSet: false,
    };
  }

  handleSetDestination = () => {
    // Lógica para definir o destino aqui
    this.setState({ isDestinationSet: true });
  };

  handleClearDestination = () => {
    // Lógica para limpar o destino aqui
    this.setState({ isDestinationSet: null });
  };

  render() {
    const { isDestinationSet } = this.state;

    return (
      <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>Petz10</TypeTitle>
        <TypeDescription>R$6,00</TypeDescription>

        <View style={{ flexDirection: 'row' }}>
          {isDestinationSet ? (
            <View style={{ marginRight: 10 }}>
              <RequestButton onPress={() => {}}>
                <RequestButtonText>Solicitar Viagem</RequestButtonText>
              </RequestButton>
            </View>
          ) : (
            <RequestButton onPress={this.handleSetDestination}>
              <RequestButtonText>Definir Destino</RequestButtonText>
            </RequestButton>
          )}

          {isDestinationSet && (
            <RequestButton onPress={this.handleClearDestination}>
              <RequestButtonText>Limpar Destino</RequestButtonText>
            </RequestButton>
          )}
        </View>
      </Container>
    );
  }
}
