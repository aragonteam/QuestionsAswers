import React, { Component } from "react";
import { View, Text } from "react-native";

import firebase from '../firebase/firebase';

class AnswerFeed extends Component {
  state = {};

  componentWillMount(){
    var database = firebase.database();
    firebase.database().ref('questions/1').once('value', function(snap) {
      console.log('I fetched a question!', snap.val());
    });
  }

  render() {
    return (
      <View>
        <Text>AnswerFeed</Text>
      </View>
    );
  }
}

export default AnswerFeed;
