import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB6RnF6aI6wnOIoqokX-JFSUdjgYvIw3OQ",
    authDomain: "login-g00gle.firebaseapp.com",
    databaseURL: "https://login-g00gle.firebaseio.com",
    projectId: "login-g00gle",
    storageBucket: "login-g00gle.appspot.com",
    messagingSenderId: "1035443609111"
  };

  firebase.initializeApp(config)

  export const ref = firebase.database().ref();
  export const auth = firebase.auth
  export const provider = new firebase.auth.GoogleAuthProvider()