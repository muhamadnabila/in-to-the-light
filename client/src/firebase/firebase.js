import firebase from 'firebase'
import firestore from 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyBg_8TGU3DuHGyRkMbqNqSlMq6uHHdhjN8",
    authDomain: "intothelight-9a98b.firebaseapp.com",
    databaseURL: "https://intothelight-9a98b.firebaseio.com",
    projectId: "intothelight-9a98b",
    storageBucket: "intothelight-9a98b.appspot.com",
    messagingSenderId: "810186552664",
    appId: "1:810186552664:web:ba61b04414a89fd2"
  };
 const firebaseApp = firebase.initializeApp(firebaseConfig);
 firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export default firebaseApp.firestore()