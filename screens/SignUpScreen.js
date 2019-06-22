import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  TextInput,
} from 'react-native';

import { db } from '../config';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';


export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
      loading:false,
      displayname: "",
      email: "",
      password: "",
      confirmpassword:"",
    }
  }

  static navigationOptions = {
    header: null,
  };


  onSignUp(){
    const value = this.state;

    let email = value.email;
    let password = value.password;
    let displayName = value.displayname;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: displayName
      }).then(() => {
        console.log("Updating Profile")
      }).catch(() => {
        return console.log("There was an issue updating your profile.")
      })

      addItem(value);

    }).catch(function(error) {
      return console.log("ERRORRRR:", error)
    })

    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName:'Map'
      })
    )
    
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
          value={this.state.displayname}
          onChangeText={(displayname) => this.setState({displayname})}
          placeholder="Display Name"
        />
        <TextInput 
          style={{height: 52, width: 272, fontSize: 24, textAlign:'center', marginBottom: 20, color: '#7A9D96', backgroundColor:'#CAE4DB'}}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
        />
        <TextInput 
          style={{height: 52, width: 272, fontSize: 24, textAlign:'center', marginBottom: 20, color: '#7A9D96', backgroundColor:'#CAE4DB'}}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput 
          style={{height: 52, width: 272, fontSize: 24, textAlign:'center', marginBottom: 20, color: '#7A9D96', backgroundColor:'#CAE4DB'}}
          value={this.state.confirmpassword}
          onChangeText={(confirmpassword) => this.setState({confirmpassword})}
          placeholder="Confirm Password"
          secureTextEntry={true}
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
