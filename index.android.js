import React, { Component, PropTypes } from 'react';
import { AppRegistry,
         StyleSheet,
         Text,
         TextInput,
         Button,
         View } from 'react-native';
import * as firebase from 'firebase';
import { GoogleSignin,
         GoogleSigninButton } from 'react-native-google-signin';

import ShowResponse from './ShowResponse';
import { Firebase } from './config';

export default class FirebaseExample extends Component {

  constructor(props) {
    super(props);
    Firebase.init();
    this.handleFirebaseonAuthStateChanged();
  }

  state = {
    userLoaded: true,
    googleUser: null,
    initialSentence: null,
    email: '',
    password: '',
    response: '',
  };

  /**
   * If you want to define a context property,
   * you must define its type via PropTypes in this
   * static method
   */
  static childContextTypes = {
    response: PropTypes.string,
  };

  /**
   * This method is part of the ReactJS flow, so it'll
   * be automatically called like render(), componentDidMount()
   * and so forth
   */
  getChildContext() {
    return {
      response: this.state.response,
    };
  }

  componentDidMount() {
    this.setupGoogleSignin();
  }

  handleFirebaseonAuthStateChanged = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user', user);
      let initialSentence = user ? `Hi there, your email is ${user.email}` : `You should login, buddy`;

      this.setState({
        userLoaded: true,
        initialSentence,
      });
    });
  }

  signUp = async () => {
    const { email,
            password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.setState({
        response: 'Account created correctly',
      });
    } catch(err) {
      this.handleError(err, 'signUp');
    }
  }

  logIn = async () => {
    const { email,
            password } = this.state;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.setState({
        response: 'Logged in correctly',
      });
    } catch(err) {
      this.handleError(err, 'logIn');
    }
  }

  logOut = async () => {
    const { email,
            password } = this.state;
    try {
      await firebase.auth().signOut();
      this.setState({
        response: 'Logged out correctly',
      });
    } catch(err) {
      this.handleError(err, 'logOut');
    }
  }

  /**
   * Surprisingly, it seems that we can't use 
   * firebase to deal with authentication
   */
  /*
  loginWithGoogle = async () => {
    try {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      provider.setCustomParameters({
        login_hint: 'user@example.com',
      });

      result = await firebase.auth().signInWithPopup(provider);
      console.log('loginWithGoogle result', result);
    } catch(err) {
      this.handleError(err, 'logout');
    }
  }
  */

  handleError = (err, method) => {
    console.log("error in method", method);
    this.setState({
      response: err.toString(),
    });
  }

  setupGoogleSignin = () => {
		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
			GoogleSignin.configure({
				scopes: ["https://www.googleapis.com/auth/drive.readonly"],
				webClientId: '110892487896-koeb6kl7t07hb2rds2st2vi2il5a271f.apps.googleusercontent.com',
				offlineAccess: false
			})
			.then(() => {
				GoogleSignin.signIn()
				.then((user) => {
					alert('User',JSON.stringify(user),[{text: 'OK', onPress: () => null}])})
				}).catch((err) => {
					console.log(error)
				}).done()

		}).catch((err) => {
			alert('Error',JSON.stringify(err),[{text: 'OK', onPress: () => null}])
		});
    /*
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId: '110892487896-koeb6kl7t07hb2rds2st2vi2il5a271f.apps.googleusercontent.com',
        offlineAccess: true
      });
      const googleUser = await GoogleSignin.currentUserAsync();
      console.log('googleUser@setupGoogleSignin', googleUser);
      this.setState({googleUser});
    } catch(err) {
      this.handleError(err, 'setupGoogleSignin');
    }
    */
  }

  signInWithGoogle = () => {
    GoogleSignin.signIn()
      .then((googleUser) => {
        console.log('googleUser@signInWithGoogle', googleUser);
        this.setState({googleUser});
      })
      .catch((err) => {
        this.handleError(err, 'signInWithGoogle');
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>

        <View>
          <Text style={styles.instructions}>
            {this.state.initialSentence}
          </Text>
        </View>

        <View style={styles.formGroup}>

          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({
              email,
            })}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => this.setState({
              password,
            })}
          />

          <View>
            <Button
              onPress={this.signUp}
              title="Sign up"
              style={styles.button}
            />
            <Button
              onPress={this.logIn}
              title="Log in"
              style={styles.button}
            />
            <Button
              onPress={this.logOut}
              title="Log out"
              style={styles.button}
            />
            <View style={styles.googleSigninButtonContainer}>
              <GoogleSigninButton
                style={{width: 120, height: 44}}
                size={GoogleSigninButton.Size.Icon}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => this.signInWithGoogle()}
              />
            </View>
          </View>
        </View>

        <ShowResponse
          response={this.state.response}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructionsContainer: {
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    width: 200,
  },
  button: {
    margin: 15,
  },
  googleSigninButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('FirebaseExample', () => FirebaseExample);
