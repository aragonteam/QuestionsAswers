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

  /**
   * Render Answer Item
   * @param {object} dataRow 
   */
  _renderRow(dataRow) {}

  /**
   * Render Ask Field
   */
  _renderFooter() {}

  /**
   * Render Question detail
   */
  _renderHeader() {}

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={ds.cloneWithRows([])}
        renderFooter={this._renderFooter.bind(this)}
        renderRow={this._renderRow.bind(this)}
        renderHeader={this._renderHeader.bind(this)}
      />
    );
  }
}

export default AnswerFeed;
