//import * as firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlInHgZgYGowodJxxUU02QP-dMUnrqNjo",
    authDomain: "web-seo-online-devices.firebaseapp.com",
    databaseURL: "https://web-seo-online-devices.firebaseio.com",
    projectId: "web-seo-online-devices",
    storageBucket: "web-seo-online-devices.appspot.com",
    messagingSenderId: "467336907858",
    appId: "1:467336907858:web:5f9bc21cbcf86b0b0de38b",
    measurementId: "G-ZD4J2YP1XE"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);
app.analytics();
app.database();

const Firebase = app;

export default Firebase;