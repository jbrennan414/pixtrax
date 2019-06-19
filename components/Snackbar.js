import * as React from 'react';
import { StyleSheet, View,Button } from 'react-native';

export default class ErrorSnackbar extends React.Component {
  state = {
    visible: false,
  };

  render() {
    const { visible } = this.state;
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.setState(state => ({ visible: !state.visible }))}
        >
          {this.state.visible ? 'Hide' : 'Show'}
        </Button>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
