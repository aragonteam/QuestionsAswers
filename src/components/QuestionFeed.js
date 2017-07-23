import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  Button,
  TouchableHighlight,
  TouchableNativeFeedback,
  RefreshControl,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import ActionButton from "react-native-action-button";
import data from "../sample/QuestionFeed";

import firebaseApp from "../firebase/firebase";

import { getQuestions } from "../actions";

/**
 * Convert data to ListView DataSource
 */
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class QuestionFeed extends Component {
  state = {
    refreshing: false,
    isLoading: true,
    lastKey: 0,
    isGet: false
  };
  
  componentWillMount() {
    this.setState(
      {
        isGet: true
      },
      () => {
        this.props.getQuestions().then(() => {
          this.setState({
            isLoading: false,
            isGet: false
          });
        });
      }
    );
  }
  /**
   * ListView end reached action
   */
  _onEndReached() {
    // if (this.state.isGet) return;

    this.setState(
      {
        isGet: true
      },
      () => {
        this.props.getQuestions(this.props.questions.posts.length).then(() =>
          this.setState({
            isGet: false
          })
        );
      }
    );
  }

  /**
   * ListView Refresh action
   */
  _onRefresh() {
    this.setState(
      {
        refreshing: true,
        isGet: true
      },
      () => {
        this.props.getQuestions().then(() => {
          this.setState({
            refreshing: false,
            isGet: false
          });
        });
      }
    );
  }

  /**
   * Render Row
   * @param {object} dataRow 
   */
  renderRow(dataRow, sectionID, rowID) {
    const Component =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    return (
      <View style={styles.itemContainer} key={sectionID}>
        <Component
          onPress={() =>
            this.props.navigation.navigate("AnswerFeed", { data: dataRow })}
        >
          <View>
            <View style={styles.headWraper}>
              <View style={styles.imageWraper}>
                <Image
                  source={{
                    uri:
                      "http://walyou.com/wp-content/uploads//2010/12/facebook-profile-picture-no-pic-avatar.jpg"
                  }}
                  style={styles.avatarStyle}
                />
              </View>
              <View style={styles.userMeta}>
                <Text>DungPS</Text>
                <Text>4 hours ago</Text>
              </View>
            </View>
            <View style={styles.titleWrapperStyle}>
              <Text style={styles.titleStyle}>
                {dataRow.title}
              </Text>
            </View>
            {dataRow.description &&
              <View style={styles.contentWrapperStyle}>
                <Text>
                  {dataRow.description}
                </Text>
              </View>}
          </View>
        </Component>
        <View style={styles.buttonGroupStyle}>
          <View style={styles.buttonWrapper}>
            <Component style={styles.buttonStyle}>
              <Text>{`${dataRow.yes_number} Yes`}</Text>
            </Component>
          </View>
          <View style={styles.buttonWrapper}>
            <Component style={styles.buttonStyle}>
              <Text>{`${dataRow.no_number} No`}</Text>
            </Component>
          </View>
          <View style={styles.buttonWrapper}>
            <Component
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate("CreateAnswer")}
            >
              <Text>{`${dataRow.other_number} answers`}</Text>
            </Component>
          </View>
        </View>
      </View>
    );
  }

  renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
      />
    );
  }

  /**
   * Render View
   */
  render() {
    // console.log("questions", this.props.questions.posts);
    return (
      <View style={{ position: "relative" }}>
        <ListView
          enableEmptySections
          dataSource={ds.cloneWithRows(data)}
          renderRow={this.renderRow.bind(this)}
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

const mapStateToProps = state => {
  return {
    questions: state.questions
  };
};

export default connect(mapStateToProps, { getQuestions })(QuestionFeed);
