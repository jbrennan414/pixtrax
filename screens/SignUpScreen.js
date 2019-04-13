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
      <ScrollView style={styles.container}>
        <Text style={styles.header}>PixTrax</Text>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <TouchableHighlight 
          onPress={this.onSignUp.bind(this)}>
          <Text>Sign Up!</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }

  // handleSignUp = () => {

  //   const value = this._form.getValue();
  //   addItem(value);

  //   this.props.navigation.dispatch(
  //     NavigationActions.navigate({
  //       routeName:'Map'
  //     })
  //   )
  // }
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
