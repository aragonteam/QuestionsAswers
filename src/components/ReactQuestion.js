import React, { Component } from "react";
import { View, Text, ListView } from "react-native";
import { Icon, List, ListItem } from "react-native-elements";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class ReactQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    const currentScene = navigation.state.key;
    const title =
      currentScene === "AnswerNoScreen"
        ? "No"
        : currentScene === "AnswerYesScreen" ? "Yes" : "All";
    return {
      title: title
    };
  };

  _renderRow(dataRow, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={dataRow.name}
        avatar={{ uri: dataRow.avatar }}
      />
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <List>
          <ListView
            enableEmptySections
            renderRow={this._renderRow.bind(this)}
            dataSource={ds.cloneWithRows([])}
          />
        </List>
      </View>
    );
  }
}

export default ReactQuestion;
