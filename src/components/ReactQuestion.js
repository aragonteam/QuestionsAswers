import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

class ReactQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    alert(JSON.stringify(navigation));
    return {
      title: "Ahihi",
      headerLeft: <Icon type="font-awesome" name="arrow-left" />
    };
  };

  render() {
    return (
      <View>
        <Text>ReactQuestion</Text>
      </View>
    );
  }
}

export default ReactQuestion;
