import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';

import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
      loading: false,
      authenticated: false,
      fontLoaded:false,
      email: "",
      password: "",
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
  
    let user = firebase.auth().currentUser;
    console.log('This is your user:', user);

    return (
      <View style={styles.container}>
        <Text style={styles.header}>PixTrax</Text>
        <TextInput 
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
        />
        <TextInput 
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          placeholder="Password"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginPress.bind(this)}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.button}
          onPress={this.handleSignUp.bind(this)}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableHighlight>
      </View>
    );
  }

  onLoginPress(){
    const value = this._form.getValue();
    this.setState({ error:'', loading: true });
    let email = value.email;
    let password = value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error:'', loading: false });
        this.props.navigation.dispatch(
          NavigationActions.navigate({
            routeName:'Map'
          })
        )
      })
      .catch(() => {
        console.log("NAH DUDE THATS WRONG")
        this.setState({error: 'Authentication failed', loading: false});
      })

  }

  handleSignUp = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName:'SignUp'
      })
    )
  }
}

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
    width:136,
    marginBottom: 10,
    padding: 5,
  },
  buttonText: {
    color:'#00303F'
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
