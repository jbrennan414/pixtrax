import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  TextInput,
} from 'react-native';

import t from 'tcomb-form-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { db } from '../config';
import * as firebase from 'firebase';

const Form = t.form.Form;

const User = t.struct({
    name: t.String,
    username: t.String,
    email: t.String,
    password: t.String,
    confirmPassword: t.String,
});

const options = {
  fields: {
    email: {
      error: 'We don\'t have that email in our system'
    },
    password: {
        password: true,
        secureTextEntry: true,
        error: 'Nope'
    },
    confirmPassword: {
        secureTextEntry: true,
    }
  },
  stylesheet: formStyles,
};

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}


export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
      loading:false,
      username: "Username",
      email: "Email",
      password: "Password",
      confirmpassword: "Confirm Password"
    }
  }

  static navigationOptions = {
    header: null,
  };


  onSignUp(){
    const value = this._form.getValue();

    let email = value.email;
    let password = value.password;
    let displayName = value.username;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: displayName
      }).then(() => {
        console.log("Updating Profile")
      }).catch(() => {
        console.log("There was an issue updating your profile.")
      })

      addItem(value);

      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName:'Map'
        })
      );
    }).catch(function(error) {
      console.log("ERRORRRR:", error)
    })
  }

  render() {
    return (
      // <ScrollView style={styles.container}>
      //   <Text style={styles.header}>PixTrax</Text>
      //   <Form 
      //     ref={c => this._form = c}
      //     type={User} 
      //     options={options}
      //   />
      //   <TouchableHighlight 
      //     onPress={this.onSignUp.bind(this)}>
      //     <Text>Sign Up!</Text>
      //   </TouchableHighlight>
      // </ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>PixTrax</Text>
        <TextInput 
          style={{height: 52, width: 272, fontSize: 24, textAlign:'center', marginBottom:20, justifyContent:'center', color: '#7A9D96', backgroundColor:'#CAE4DB'}}
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput 
          style={{height: 52, width: 272, fontSize: 24, textAlign:'center', marginBottom: 20, color: '#7A9D96', backgroundColor:'#CAE4DB'}}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput 
          style={{height: 52, width: 272, fontSize: 24, textAlign:'center', marginBottom: 20, color: '#7A9D96', backgroundColor:'#CAE4DB'}}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
        />
        <TextInput 
          style={{height: 52, width: 272, fontSize: 24, textAlign:'center', marginBottom: 20, color: '#7A9D96', backgroundColor:'#CAE4DB'}}
          value={this.state.confirmpassword}
          onChangeText={(confirmpassword) => this.setState({confirmpassword})}
        />
        <TouchableHighlight 
          style={styles.button}
          onPress={this.onSignUp.bind(this)}>
          <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableHighlight>
    </View>
    );
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
    width:136,
    marginBottom: 10,
    padding: 5,
  },
  buttonText: {
    color:'#00303F'
  },
});
