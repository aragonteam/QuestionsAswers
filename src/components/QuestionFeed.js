import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ListView,
  Button,
  TouchableHighlight,
  TouchableNativeFeedback,
  RefreshControl,
  Platform,
  StyleSheet
} from "react-native";
import {
  RkTheme,
  RkButton,
  RkCard,
  RkText,
  RkComponent
} from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import ActionButton from "react-native-action-button";
import data from "../sample/QuestionFeed";
import _ from "lodash";
import moment from "moment";

import firebaseApp from "../firebase/firebase";

import { getQuestions } from "../actions";

/**
 * Convert data to ListView DataSource
 */
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

RkTheme.setType("RkCard", "imgBlock", {
  container: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  img: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
});

class QuestionFeed extends Component {
  state = {
    refreshing: false,
    isLoading: true,
    lastKey: 0,
    isGet: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Question & Answer",
      headerTitleStyle: {
        color: "#fff",
        textAlign: "center"
      },
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#88c057"
      }
    };
  };

  componentWillMount() {
    this.props.getQuestions().then(() => {
      console.log(this.props.questions.posts);
    });
  }

  _getAnswerObject(data) {
    let result = {
      yes: 0,
      no: 0,
      all: 0,
      yesPercent: 1,
      noPercent: 1,
      otherPercent: 1
    };

    if (data.answers) {
      result.all = Object.keys(data.answers).length;
      if (result.all > 0 && !_.isEmpty(data.answers)) {
        _.forEach(data.answers, v => {
          if (v && v.answerType) {
            if (v.answerType == data.option1) {
              result.yes = result.yes + 1;
            } else if (v.answerType == data.option2) {
              result.no = result.no + 1;
            }
          }
        });

        result.yesPercent = result.yes / result.all;
        result.noPercent = result.no == 0 ? 0 : result.no / result.all;
        result.otherPercent = 1 - result.yesPercent - result.noPercent;
      }
    }

    return result;
  }

  _renderImage(rowData) {
    if (rowData.image_url || rowData.image) {
      return (
        <Image rkCardImg source={{ uri: rowData.image || rowData.image_url }} />
      );
    } else {
      return (
        <View
          rkCardImg
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        />
      );
    }
  }

  /**
   * Render Row
   * @param {object} rowData 
   */
  renderRow(rowData, sectionID, rowID) {
    const {
      yes,
      no,
      all,
      yesPercent,
      noPercent,
      otherPercent
    } = this._getAnswerObject(rowData);
    const Touchable =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    let qID =
      parseInt(Object.keys(this.props.questions.posts).length) -
      1 -
      parseInt(rowID);
    return (
      <Touchable
        onPress={() =>
          this.props.navigation.navigate("AnswerFeed", {
            data: rowData,
            qID: qID,
            rowID: rowID
          })}
        key={rowID}
      >
        <View>
          <RkCard
            rkType="imgBlock"
            style={{
              marginVertical: 8,
              backgroundColor: "#ddd",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              paddingHorizontal: 14
            }}
          >
            {this._renderImage(rowData)}
            <View
              rkCardImgOverlay
              rkCardContent
              style={{
                height: 85,
                marginHorizontal: 14,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8
              }}
            >
              <RkText
                rkType="header4 inverseColor"
                style={{ color: "#ddd", fontSize: 18, fontWeight: "bold" }}
              >
                {rowData.title}
              </RkText>
              <RkText style={{ marginTop: 5, color: "white" }}>
                5 hours ago
              </RkText>
            </View>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1
                }}
              >
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <Touchable style={{ flex: 1 }}>
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: "#fff",
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        borderWidth: 0.5,
                        borderColor: "#9ea4ab"
                      }}
                    >
                      <Text
                        style={{
                          color: "#88c057",
                          fontWeight: "bold",
                          fontSize: 18
                        }}
                      >{`${yes}`}</Text>
                      <Text
                        style={{
                          color: "#9EA4AB",
                          fontWeight: "bold",
                          fontSize: 18
                        }}
                      >{`${rowData.option1}`}</Text>
                    </View>
                  </Touchable>
                </View>
                <View style={{ flex: 1 }}>
                  <Touchable style={{ flex: 1 }}>
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: "#fff",
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 10,
                        marginLeft: 10,
                        borderWidth: 0.5,
                        borderColor: "#9ea4ab"
                      }}
                    >
                      <Text
                        style={{
                          color: "#88c057",
                          fontWeight: "bold",
                          fontSize: 18
                        }}
                      >{`${no}`}</Text>
                      <Text
                        style={{
                          color: "#9EA4AB",
                          fontWeight: "bold",
                          fontSize: 18
                        }}
                      >{`${rowData.option2}`}</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                height: 10,
                borderRadius: 50
              }}
            >
              <View style={{ backgroundColor: "#88c057", flex: yesPercent }} />
              <View style={{ backgroundColor: "blue", flex: noPercent }} />
              <View style={{ backgroundColor: "grey", flex: otherPercent }} />
            </View>
          </RkCard>
        </View>
      </Touchable>
    );
  }

  /**
   * Render View
   */
  render() {
    // console.log("questions", this.props.questions.posts);
    return (
      <View
        style={{
          backgroundColor: "#ddd",
          paddingVertical: 8,
          flex: 1
        }}
      >
        <ListView
          enableEmptySections
          dataSource={ds.cloneWithRows(this.props.questions.posts)}
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

const mapStateToProps = state => {
  return {
    questions: state.questions
  };
};

export default connect(mapStateToProps, { getQuestions })(QuestionFeed);
