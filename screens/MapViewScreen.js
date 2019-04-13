import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from 'firebase';

import { 
  Button, 
  Alert,
  StyleSheet 
} from 'react-native';


export default class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude:'',
      latitude:'',
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
    
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  static navigationOptions = {
    title: 'Map',
  };

  onRegionChange(region){
    console.log('DUDE LOOKS LIKE YOU CHANGED A REGION', region);
    latitude = region.latitude;
    longitude = region.longitude;

    this.setState({ longitude, latitude });
  }

  addLocation(){
    console.log("EYYYYY YOU HIT ADD LOCATION", this.state)
  }

  render() {

    let user = firebase.auth().currentUser;
    console.log("FOOOOOOOOOOOOO ", user.uid);


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
        <Button
          onPress={this.addLocation.bind(this)}
          title="ADD A LOCATION"
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