import React from 'react';
import { Text, CameraRoll,  Alert,  View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { takeSnapshotAsync } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _onSaySave = async () => {
    const uri = await takeSnapshotAsync(this.picture);
    await CameraRoll.saveToCameraRoll(uri)
      .then(() => {
        Alert.alert("Image has been saved");
      });
  }

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