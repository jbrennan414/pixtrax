import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';


export default class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        title: 'Cheeseman',
        key:1,
        coordinates: {
          latitude: 39.7329,
          longitude: -104.9668685551582
        },
      },
      {
        title: 'Zoo',
        key:2,
        coordinates: {
          latitude: 39.7461,
          longitude: -104.9503
        },  
      }]
    }
  }

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
        {this.state.markers.map(marker => (
          <MapView.Marker 
            coordinate={marker.coordinates}
            title={marker.title}
          />
        ))}
        <Icon
          style ={styles.container}
          name="plus-circle"
          color="green"
          size={60}
        />  
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    textAlign:'center',
    flex: 1,
    bottom: 0,
    position: 'absolute'
  }
})