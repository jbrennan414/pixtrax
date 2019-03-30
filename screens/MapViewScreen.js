import React from 'react';
import { MapView } from 'expo';

export default class MapViewScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 39.7392,
            longitude: -104.9903,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    );
  }
}
