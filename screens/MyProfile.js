import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { db } from '../config';
import * as firebase from 'firebase';

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
      loading:false,
      editable: false,
    }
  }

  static navigationOptions = {
    header: null,
  };

  onEdit(){
    if (this.state.editable == true){
      this.setState({ editable: false });
    } else {
      this.setState({ editable: true });
    }
  }

  render() {

    let user = firebase.auth().currentUser;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>PixTrax</Text>
        <TextInput 
          style={styles.inputBox}
          value={user.displayName}
          onChangeText={(email) => this.setState({email})}
          placeholder={user.displayName}
          editable={this.state.editable}
        />
        <TextInput 
          style={styles.inputBox}
          value={user.email}
          onChangeText={(password) => this.setState({password})}
          placeholder={user.email}
          editable={this.state.editable}
        />
        {this.state.editable ? (
          <View>
            <TouchableHighlight
              style={styles.button}
              onPress={this.onEdit.bind(this)}>
                <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this.onEdit.bind(this)}>
                <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableHighlight>
          </View>
        ) : (
          <TouchableHighlight
          style={styles.button}
          onPress={this.onEdit.bind(this)}>
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableHighlight>
        )}
        <TouchableHighlight
          style={styles.button}>
          {/* // onPress={this.onLoginPress.bind(this)} */}
          <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
        </TouchableHighlight>
      </View>
    );
  }

  handleSignUp = () => {

    const value = this._form.getValue();
    addItem(value);

    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName:'Map'
      })
    )
  }
};

const addItem = item => {  
  db.ref('/users').push({
    item
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00303F',
    paddingTop: 120,
    alignItems:'center',
  },
  header: {
    fontWeight:"100",
    fontSize:52,
    letterSpacing:3,
    textAlign: 'center',
    color:'#CAE4DB',
    paddingBottom:20,
  },
  button: {
    backgroundColor:'#DCAE1E',
    alignItems:'center',
    height:29,
    width:160,
    marginBottom: 10,
    padding: 5,
  },
  inputBox: {
    height: 52,
    width: 272,
    fontSize: 24,
    textAlign:'center',
    marginBottom:20,
    color: '#7A9D96',
    backgroundColor:'#CAE4DB'
  }
});
