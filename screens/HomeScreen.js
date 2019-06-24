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
import { Snackbar } from 'react-native-paper';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
      loading: false,
      authenticated: false,
      snackbarVisible: false,
      fontLoaded:false,
      loggedIn:false,
      email: "",
      password: "",
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
  
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
          secureTextEntry={true}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginPress.bind(this)}>
          {this.state.loggedIn ? (
            <Text style={styles.buttonText}>LOG OUT</Text>
          ) : (
            <Text style={styles.buttonText}>LOGIN</Text>
          )}
        </TouchableHighlight>
        {!this.state.loggedIn ? (<TouchableHighlight 
          style={styles.button}
          onPress={this.handleSignUp.bind(this)}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableHighlight>):(<Text></Text>)}
        <Snackbar
          visible={this.state.snackbarVisible}
          onDismiss={() => this.setState({ snackbarVisible: false })}
          action={{
            label: 'Oops',
            onPress: () => this.setState({ snackbarVisible:false }),
          }}
        >Hey, your password is wrong</Snackbar>
      </View>
    );
  }

  onLoginPress(){
    let { email, password } = this.state;

    if (this.state.loggedIn){
      // return this.setState({ email:'', password:'', loggedIn: false})
      return firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        this.setState({ email:'', password:'', loggedIn:false });
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error:'', loading: false, loggedIn:true });
        this.props.navigation.dispatch(
          NavigationActions.navigate({
            routeName:'Map'
          })
        )
      })
      .catch(() => {
        this.setState({error: 'Authentication failed', loading: false, snackbarVisible:true });
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
