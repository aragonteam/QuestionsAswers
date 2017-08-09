import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDnffU0kFI2fBq4XKAaNEDL1sy_IfvOc3M",
  authDomain: "aragon-qa.firebaseapp.com",
  databaseURL: "https://aragon-qa.firebaseio.com",
  projectId: "aragon-qa",
  storageBucket: "aragon-qa.appspot.com",
  messagingSenderId: "450211678584"
};

// var config = {
//   apiKey: "AIzaSyBi1QHW9hpJXABa-9YPnV-Y1MFGmZffMlI",
//   authDomain: "nearby-d5d5f.firebaseapp.com",
//   databaseURL: "https://nearby-d5d5f.firebaseio.com",
//   projectId: "nearby-d5d5f",
//   storageBucket: "nearby-d5d5f.appspot.com",
//   messagingSenderId: "498513684386"
// };

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
