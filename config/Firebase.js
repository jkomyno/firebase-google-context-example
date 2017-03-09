import * as firebase from 'firebase';

export default class Firebase {
  static init() {
    firebase.initializeApp({
      apiKey: "AIzaSyC8wIY0rYsiWek8Zt2zOmjqvzpGSqGXLNA",
      authDomain: "myfrutto-158907.firebaseapp.com",
      databaseURL: "https://myfrutto-158907.firebaseio.com",
      storageBucket: "myfrutto-158907.appspot.com",
      messagingSenderId: "110892487896"
    });
  }
}
