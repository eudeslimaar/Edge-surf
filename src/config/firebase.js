import firebase from 'firebase'
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDGCjdDLuYD-9VMIOXnih6EP7DJhBQlcFE",
  authDomain: "edge-surf-react.firebaseapp.com",
  projectId: "edge-surf-react",
  storageBucket: "edge-surf-react.appspot.com",
  messagingSenderId: "3493958285",
  appId: "1:3493958285:web:86d01974d9018f6fd3c8c4"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth }