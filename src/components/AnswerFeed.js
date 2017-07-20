import React, { Component } from "react";
import { View, Text, ListView } from "react-native";

/**
 * Convert data to ListView DataSource
 */
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 != r2
});

class AnswerFeed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Answer"
    };
  };
  componentWillMount(){
    var database = firebase.database();
    firebase.database().ref('questions/1').once('value', function(snap) {
      console.log('I fetched a question!', snap.val());
    });
  }  
  render() {
    return <ListView enableEmptySections dataSource={ds.cloneWithRows([])} />;
  }
}

export default AnswerFeed;
