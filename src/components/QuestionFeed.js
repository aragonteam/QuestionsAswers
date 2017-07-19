import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  Button,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import ActionButton from "react-native-action-button";
import data from "../sample/QuestionFeed";

/**
 * Convert data to ListView DataSource
 */
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 != r2
});

class QuestionFeed extends Component {
  state = {
    refreshing: false
  };
  /**
   * ListView end reached action
   */
  _onEndReached() {}

  /**
   * ListView Refresh action
   */
  _onRefresh() {}

  /**
   * Render Row
   * @param {object} dataRow 
   */
  renderRow(dataRow) {
    return (
      <View style={styles.itemContainer} key={dataRow._id}>
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("AnswerFeed", { data: dataRow })}
        >
          <View>
            <View style={styles.headWraper}>
              <View style={styles.imageWraper}>
                <Image
                  source={{ uri: dataRow.user.avatar }}
                  style={styles.avatarStyle}
                />
              </View>
              <View style={styles.userMeta}>
                <Text>
                  {dataRow.user.name}
                </Text>
                <Text>4 hours ago</Text>
              </View>
            </View>
            <View style={styles.titleWrapperStyle}>
              <Text style={styles.titleStyle}>
                {dataRow.title}
              </Text>
            </View>
            {dataRow.content &&
              <View styles={styles.contentWrapperStyle}>
                <Text>
                  {dataRow.content}
                </Text>
              </View>}
          </View>
        </TouchableHighlight>
        <View style={styles.buttonGroupStyle}>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight style={styles.buttonStyle}>
              <Text>{`${dataRow.yes} Yes`}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight style={styles.buttonStyle}>
              <Text>{`${dataRow.no} No`}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate("CreateAnswer")}
            >
              <Text>{`${dataRow.answers} answers`}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  /**
   * Render View
   */
  render() {
    return (
      <View style={{ position: "relative" }}>
        <ListView
          enableEmptySections
          dataSource={ds.cloneWithRows(data)}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
        <ActionButton
          buttonColor="red"
          onPress={() => this.props.navigation.navigate("CreateQuestion")}
        />
      </View>
    );
  }
}

const styles = {
  itemContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  innerStyle: {
    padding: 20
  },
  headWraper: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    marginBottom: 10
  },
  imageWraper: {
    flex: 0.2
  },
  userMeta: {
    flex: 1
  },
  titleWrapperStyle: {
    marginBottom: 10
  },
  contentWrapperStyle: {
    marginBottom: 10
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  avatarStyle: {
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 1
  },
  buttonGroupStyle: {
    flexDirection: "row",
    borderTopWidth: 0.2
    // justifyContent: "space-between"
  },
  buttonWrapper: {
    flex: 0.3
  },
  buttonStyle: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8
  }
};

export default connect()(QuestionFeed);
