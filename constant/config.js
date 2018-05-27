import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBJts_tFd-VYf7YQu5xSP05t2MfbcDY0OA",
    authDomain: "todo-29.firebaseapp.com",
    databaseURL: "https://todo-29.firebaseio.com",
    projectId: "todo-29",
    storageBucket: "todo-29.appspot.com",
    messagingSenderId: "388644091738"
  };
export const firebaseApp =  firebase.initializeApp(config);