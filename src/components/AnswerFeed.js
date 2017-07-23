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
import { HeaderBackButton } from "react-navigation";
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
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate("Home")} />
      ),
      headerTitle: (
        <ReactButton onPress={() => navigation.navigate("ReactQuestion")}>
          <Text style={styles.headerTitle}>{`100 reacted`}</Text>
        </ReactButton>
      )
    };
  };

  /**
   * Upvote and Downvote action
   * @param {int|string} answerID 
   * @param {string} type 
   */
  _voteAction(answerID, type = "up") {}

  /**
   * Render Answer Item
   * @param {object} dataRow 
   */
  _renderRow(dataRow, sectionID, rowId) {
    return (
      <View style={styles.wrapItem} key={rowId}>
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
          <View style={styles.itemHead}>
            <Text style={styles.userNameStyle}>DungPS</Text>
            <Text style={styles.timeDiffStyle}>4 hours ago</Text>
          </View>
          <Text>
            {dataRow.content}
          </Text>
        </View>
        <View style={{ flex: 0.05 }}>
          <Icon
            type="font-awesome"
            name="chevron-up"
            size={18}
            onPress={() => this._voteAction(rowId, "up")}
          />
          <Text>+19</Text>
          <Icon
            type="font-awesome"
            name="chevron-down"
            size={18}
            onPress={() => this._voteAction(rowId, "down")}
          />
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
      <View
        style={{
          backgroundColor: "white"
        }}
      >
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
  },
  wrapItem: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    marginBottom: 5
  },
  headerTitle: {
    fontSize: Platform.OS === "ios" ? 17 : 20,
    fontWeight: Platform.OS === "ios" ? "600" : "500",
    color: "rgba(0, 0, 0, .9)",
    textAlign: Platform.OS === "ios" ? "center" : "left",
    marginHorizontal: 16
  },
  itemHead: {
    flexDirection: "row",
    flex: 1
  },
  userNameStyle: {
    // alignSelf: "left"
    fontWeight: "bold"
  },
  timeDiffStyle: {
    // alignSelf: "left"
    marginLeft: 5
  }
};

export default AnswerFeed;
