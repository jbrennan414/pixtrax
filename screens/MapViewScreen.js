import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from 'firebase';
import { db } from '../config'

import { 
  Button, 
  Alert,
  Text,
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

  componentDidMount(){
    let marker =[];
    let query = firebase.database().ref("locations").orderByKey();
    query.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
        let childData = childSnapshot.val();
        let pointData = Object.values(childData);
        pointData = Object.values(pointData)[0];
        let latitude = pointData["latitude"];
        let longitude = pointData["longitude"];
        let oldData = {
          title: 'TestLocation',
          coordinates:{
            latitude: latitude,
            longitude: longitude,
          }
        }
        marker.push(oldData);
      });
    })


  }

  onRegionChange(region){
    latitude = region.latitude;
    longitude = region.longitude;

    this.setState({ longitude, latitude });
  }

  addLocation(){
    //I need to get access to user.uid here
    let latitude = this.state.latitude;
    let longitude = this.state.longitude;

    let locationObject= { 
      latitude: latitude,
      longitude: longitude,
    }

    db.ref('/locations').push({
      locationObject
    });
  }

  render() {
    // let user = firebase.auth().currentUser;
    console.log("!!!!!!!!! how often do we hit this?")

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