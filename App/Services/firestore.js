import firebase from 'firebase';
import 'firebase/firestore';

const REACT_APP_FIREBASE_API_KEY = 'AIzaSyAnGRcMaRqS3T6GQlI8IRuXDo2f8_-47YI';
const REACT_APP_FIREBASE_AUTH_DOMAIN = 'react-benchmark.firebaseapp.com';
const REACT_APP_FIREBASE_DATABASE_URL = 'https://react-benchmark.firebase io.com';
const REACT_APP_FIREBASE_PROJECT_ID = 'react-benchmark';
const REACT_APP_FIREBASE_STORAGE_BUCKET = 'react-benchmark.appspot.com';
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = '408586228173';
const REACT_APP_FIREBASE_APP_ID = '1:408586228173:web:c942a6a0c65063f3';
const REACT_APP_COLLECTION_NAME = 'benchmark';
const REACT_APP_DOC_NAME = 'native';

export const config = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  collectionName: REACT_APP_COLLECTION_NAME,
  docName: REACT_APP_DOC_NAME,
};

export const initializeFirestore = () => firebase.initializeApp(config);

export const getFirestore = () =>
  firebase
    .firestore()
    .collection(config.collectionName)
    .doc(config.docName);
