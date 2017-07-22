import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
import data from "../sample/AnswerFeed";

/**
 * Convert data to ListView DataSource
 */
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 != r2
});

class AnswerFeed extends Component {
  static navigationOptions = ({ navigation }) => {
    const ReactButton =
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableHighlight;
    return {
      title: "Answer",
      headerTitle: (
        <ReactButton onPress={() => navigation.navigate("ReactQuestion")}>
          <Text>{`100 reacted`}</Text>
        </ReactButton>
      )
    };
  };
  /**
   * Render Answer Item
   * @param {object} dataRow 
   */
  _renderRow(dataRow) {
    return (
      <View style={{ flexDirection: "row", flex: 1, padding: 10 }}>
        <View style={{ flex: 0.1 }}>
          <Image
            source={{
              uri:
                "http://walyou.com/wp-content/uploads//2010/12/facebook-profile-picture-no-pic-avatar.jpg"
            }}
            style={styles.avatarStyle}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <View>
            <Text>DungPS</Text>
            <Text>4 hours ago</Text>
          </View>
          <Text>
            {dataRow.content}
          </Text>
        </View>
        <View style={{ flex: 0.05 }}>
          <Icon type="font-awesome" name="chevron-up" size={18} />
          <Text>+19</Text>
          <Icon type="font-awesome" name="chevron-down" size={18} />
        </View>
      </View>
    );
  }

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
      <View>
        <ListView
          enableEmptySections
          dataSource={ds.cloneWithRows(data)}
          renderFooter={this._renderFooter.bind(this)}
          renderRow={this._renderRow.bind(this)}
          renderHeader={this._renderHeader.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  avatarStyle: {
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 1
  }
};

export default AnswerFeed;
