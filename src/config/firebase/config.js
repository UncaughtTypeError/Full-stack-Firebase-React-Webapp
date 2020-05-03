//import * as firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "redacted",
    authDomain: "redacted",
    databaseURL: "redacted",
    projectId: "redacted",
    storageBucket: "redacted",
    messagingSenderId: "redacted",
    appId: "redacted",
    measurementId: "redacted"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);
app.analytics();
app.database();

const Firebase = app;

export default Firebase;
