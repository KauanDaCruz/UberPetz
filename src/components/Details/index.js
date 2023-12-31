import React, { Component } from "react";
import { View } from "react-native";

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
  render() {
    return (
      <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>Petz10</TypeTitle>
        <TypeDescription>R$35,00</TypeDescription>

        <RequestButton onPress={() => {}}>
          <RequestButtonText>SOLICITAR PETZ10X</RequestButtonText>
        </RequestButton>
      </Container>
    );
  }
}