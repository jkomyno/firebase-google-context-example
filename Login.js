import React, { Component } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         TouchableOpacity,
         StyleSheet } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    padding: 50,
  },
  submit: {
    paddingTop: 30,
  },
  response: {
    textAlign: "center",
    paddingTop: 0,
    padding: 50,
  },
});

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    response: '',
  };

  signUp = async () => {
    const { email,
            password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.setState({
        response: 'Account created correctly',
      });
    } catch(err) {
      this.setState({
        response: err.toString(),
      });
    }
  }

  logIn = async () => {
    const { email,
            password } = this.state;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch(err) {
      this.setState({
        response: err.toString(),
      });
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <TextInput
              onChangeText={(email) => this.setState({
                email,
              })}
            />
            <TextInput
              onChangeText={(password) => this.setState({
                password,
              })}
            />
            <View style={styles.submit}>
              <Button
                onPress={this.signUp}
                title="Sign up"
              />
              <Button
                onPress={this.logIn}
                title="Log in"
              />
            </View>
          </View>
          <View>
            <Text style={styles.response}>{this.state.response}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
