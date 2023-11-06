import React from "react";
import MapViewDirections from "react-native-maps-directions";
import config from "../../config"

function directions({ userLocation, destination }) {
  return (
    <MapViewDirections
      origin={userLocation}
      destination={destination}
      apikey={config.GoogleApi}
      strokeWidth={3}
      strokeColor="blue"
    />
  );
}

export default directions;