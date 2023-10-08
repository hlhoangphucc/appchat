import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAHjyr559U1Exn59Au28Gp5-BIDEo7nSz8',
  authDomain: 'app-chat-d0bc3.firebaseapp.com',
  databaseURL: 'https://app-chat-d0bc3-default-rtdb.firebaseio.com',
  projectId: 'app-chat-d0bc3',
  storageBucket: 'app-chat-d0bc3.appspot.com',
  messagingSenderId: '868642652224',
  appId: '1:868642652224:web:f8d952041b89ad617e1fa5',
  measurementId: 'G-280F2CG436',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getDatabase();
export { firebaseApp as firebase, db };
