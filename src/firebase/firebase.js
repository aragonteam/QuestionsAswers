import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDnffU0kFI2fBq4XKAaNEDL1sy_IfvOc3M",
  authDomain: "aragon-qa.firebaseapp.com",
  databaseURL: "https://aragon-qa.firebaseio.com",
  projectId: "aragon-qa",
  storageBucket: "aragon-qa.appspot.com",
  messagingSenderId: "450211678584"
};
firebase.initializeApp(config);

export default firebase;