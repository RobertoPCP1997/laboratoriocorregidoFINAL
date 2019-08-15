import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBUVTa95nPiJGiK399x9xZqsNa0f14LwB8",
    authDomain: "graficacion-a9e2e.firebaseapp.com",
    databaseURL: "https://graficacion-a9e2e.firebaseio.com",
    projectId: "graficacion-a9e2e",
    storageBucket: "",
    messagingSenderId: "186909481151",
    appId: "1:186909481151:web:434aac42386904b7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase;