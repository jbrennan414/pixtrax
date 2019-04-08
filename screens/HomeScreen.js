import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  View,
} from 'react-native';

import * as firebase from 'firebase';
import { db } from '../config';
import t from 'tcomb-form-native';
import { StackActions, NavigationActions } from 'react-navigation';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
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


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
      loading: false,
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>PixTrax</Text>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <TouchableHighlight 
          onPress={this.onLoginPress.bind(this)}>
          <Text>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={this.handleSignUp.bind(this)}>
          <Text>Sign Up</Text>
        </TouchableHighlight>
      </View>
    );
  }

  onLoginPress(){
    this.setState({error:'', loading:true})
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("DUDE IT FUUUUCKING WORKED");
      this.setState({error:'',loading:false});
      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName:'Map'
        })
      );
    })
    .catch(() => {
      console.log("BBBBBBB catch");
      this.setState({error:'Authentication failed', loading: false})
    })

  }

  renderButtonOrLoading(){
    if (this.state.loading) {
      return <Text> Loading </Text>
    }
    return <View>
      <Button
        onPress={this.onLoginPress.bind(this)}
        title='Login'
      />
    </View>
  }

  handleSignUp = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName:'SignUp'
      })
    )
  }
}

const addItem = item => {  
  db.ref('/login').push({
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
