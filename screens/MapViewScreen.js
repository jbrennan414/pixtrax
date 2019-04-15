import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from 'firebase';
import { db } from '../config'
import { Permissions, Location } from 'expo';

import { 
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';


export default class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude:'',
      latitude:'',
      locationResult:null,
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
    this.getLocationAsync();


    let markers = this.state.markers;
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
        markers.push(oldData);
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

    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName:'Camera'
      })
    )
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }
 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  };

  render() {
    // let user = firebase.auth().currentUser;

    return (
      <MapView
        onRegionChange={this.onRegionChange}
        style={styles.container}
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
        {this.state.location ? (
        <MapView.Marker
          coordinate={this.state.location.coords}
          title="MY ACTUAL LOCATION"
          description="Some description"
          image={require('../assets/images/location.png')}
        />
        ):(<Text></Text>)}
        <TouchableOpacity
          style={styles.container}
          onPress={this.addLocation.bind(this)}>
            <Ionicons name="ios-camera" size={40} color="#00303F" />
        </TouchableOpacity>
        
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'flex-end'
  },
})