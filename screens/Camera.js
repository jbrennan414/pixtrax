import React from 'react';
import { Text, CameraRoll,  Alert,  View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';


export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    cameraRollUri: null,
  };

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _onSaySave = async () => {
    if (this.camera) {
      console.log('Taking photo');
      const options = { quality: 1, base64: true, fixOrientation: true,  exif: true};
      await this.camera.takePictureAsync(options).then(photo => {
        // photo.exif.Orientation = 1;
        CameraRoll.saveToCameraRoll(photo.uri).then(Alert.alert("Saved to Camera Roll"))
        //after
        this.props.navigation.dispatch(
          NavigationActions.navigate({
            routeName:'Map',
            params: {
              newPhoto: true
            }
          })
        )
      });
    }
  }

  //test
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View ref={(r) => this.picture = r} style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
                <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={ this._onSaySave }>
                <Ionicons name="ios-aperture" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}