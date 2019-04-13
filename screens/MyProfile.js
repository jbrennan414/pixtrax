import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

import t from 'tcomb-form-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { db } from '../config';
import * as firebase from 'firebase';

const Form = t.form.Form;




export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
      loading:false,
    }
  }

  static navigationOptions = {
    header: null,
  };


  onSignUp(){
    const value = this._form.getValue();

    let email = value.email;
    let password = value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {

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

    let user = firebase.auth().currentUser;

    console.log("MY PROFILE:", user);

    if (user){
      console.log('MYYYYYPROFILE', user.email);
    } else {
      console.log('WE DIDNT LOG IN', user)
    }

    
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>PixTrax</Text>
        <Text>Display Name: {user.displayName}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Change My Password</Text>
        <TouchableHighlight 
          onPress={this.onSignUp.bind(this)}>
          <Text>Edit</Text>
        </TouchableHighlight>


      </ScrollView>
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
    backgroundColor: '#fff',
    padding: 40,
    marginTop: 40,

  },
  header: {
    fontSize:24,
    textAlign: 'center',
  },
  button: {
    fontSize:24,
    textAlign:'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
