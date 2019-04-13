import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default class MapViewScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  onRegionChange(region){
    console.log('DUDE LOOKS LIKE YOU CHANGED A REGION', region);
  }

  render() {
    return (
        <MapView
        onRegionChange={this.onRegionChange}
        style={{ flex: 1 }}
          initialRegion={{
            latitude: 39.7392,
            longitude: -104.9903,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          >
          <Marker
            coordinate={
              {latitude: 39.7392,
              longitude: -104.9903}}
            title={"Point 1"}
            description={"description"}
          />
          <Marker
            coordinate={
              {latitude: 39.7104,
              longitude: -104.9901}}
            title={"Point 2"}
            description={"description"}
          />
      </MapView>
    );
  }
}
