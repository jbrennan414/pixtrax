import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from 'firebase';
import { db } from '../config'
import { Permissions, Location } from 'expo';

import { 
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
      currentLatitude:'',
      uid:'',
      currentLocation:'',
      loading: true,
      markers: [],
    }
    
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  static navigationOptions = {
    header: null,
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
        let uid = pointData["uid"];
        let oldData = {
          title: 'TestLocation',
          uid:uid,
          key: childSnapshot.key,
          coordinates:{
            latitude: latitude,
            longitude: longitude,
          }
        }
        markers.push(oldData);
      });
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({ uid: user.uid })
      } else {
        console.log("We don't have a UID")
      }
    })

  }

  onRegionChange(region){
    latitude = region.latitude;
    longitude = region.longitude;

    this.setState({ longitude, latitude });
  }

  addLocation(){
    this.setState({ loading: false })
    //I need to get access to user.uid here
    let latitude = this.state.latitude;
    let longitude = this.state.longitude;

    let locationObject= { 
      latitude: latitude,
      longitude: longitude,
      uid: this.state.uid,
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
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;

    this.setState({ 
      currentLatitude: latitude,
      currentLocation: longitude,
      locationResult: JSON.stringify(location), location,
    });
  };

  renderMarkers(marker){
    key= marker.key;
    if (marker["uid"] == this.state.uid){
      return (
        <MapView.Marker 
          pinColor="blue"
          key={key}
          coordinate={marker.coordinates}
          title={marker.title}
        />
      )
    } else {
      return (
        <MapView.Marker 
          pinColor="red"
          key={key}
          coordinate={marker.coordinates}
          title={marker.title}
        />
      )
    }
  }

  render() {
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
        this.renderMarkers(marker)
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
          style={styles.camera}
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
  loadingSpinner:{
    flex: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  camera:{
    justifyContent:'center',
    alignItems:'center'
  }
})