import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC9DsDcv4HHo0f2W0l4Z4kfE8ei7zTN6RI",
  authDomain: "breadbook-72aaf.firebaseapp.com",
  databaseURL: "https://breadbook-72aaf.firebaseio.com",
  projectId: "breadbook-72aaf",
  storageBucket: "breadbook-72aaf.appspot.com",
  messagingSenderId: "440493153224",
  appId: "1:440493153224:web:ef5a91f7fb742d1275befd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
