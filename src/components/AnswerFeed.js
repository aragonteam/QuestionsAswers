import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  Button,
  StatusBar
} from "react-native";
import { Icon } from "react-native-elements";
import { RkTheme, RkTabView, RkCard, RkText } from "react-native-ui-kitten";
import { HeaderBackButton } from "react-navigation";
import data from "../sample/AnswerFeed";
import _ from "lodash";

RkTheme.setType("RkCard", "imgBlock", {
  container: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 0
  },
  img: {
    flex: 1
  },
  imgOverlay: {
    opacity: 8
  }
});

class AnswerFeed extends Component {
  static navigationOptions = ({ navigation }) => {
    const Touchable =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    return {
      title: "Question",
      headerLeft: (
        <HeaderBackButton
          onPress={() => navigation.navigate("Home")}
          tintColor="white"
        />
      ),
      headerStyle: {
        backgroundColor: "#88c057"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerRight: (
        <Touchable
          onPress={() =>
            navigation.navigate("CreateAnswer", {
              qID: navigation.state.params.qID,
              rowID: navigation.state.params.rowID,
              lastkey: Object.keys(navigation.state.params.data.answers || {})
                .length
            })}
        >
          <Text
            style={{
              backgroundColor: "#fff",
              color: "#88c057",
              paddingHorizontal: 40,
              paddingVertical: 10,
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 10,
              borderRadius: 50
            }}
          >
            Answer
          </Text>
        </Touchable>
      )
    };
  };

  constructor() {
    super();

    this._getData = this._getData.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  _getData(data) {
    let result = {
      yes: 0,
      no: 0,
      all: 0,
      yesPercent: 1,
      noPercent: 1,
      totalvoted: 1
    };

    if (data && data.answers) {
      result.all = Object.keys(data.answers).length;
      if (result.all > 0 && !_.isEmpty(data.answers)) {
        _.forEach(data.answers, v => {
          if (v && v.answerType) {
            if (v.answerType == data.option1) {
              result.yes = result.yes + 1;
              result.totalvoted = result.totalvoted + 1;
            } else if (v.answerType == data.option2) {
              result.no = result.no + 1;
              result.totalvoted = result.totalvoted + 1;
            }
          }
        });

        if (result.totalvoted > 0) {
          result.yesPercent = result.yes / result.totalvoted;
          result.noPercent = 1 - result.yesPercent;
        }
      }
    }

    return result;
  }

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
    //http://walyou.com/wp-content/uploads//2010/12/facebook-profile-picture-no-pic-avatar.jpg
    return (
      <View style={styles.wrapItem} key={rowId}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{ width: 24, height: 24, borderRadius: 50 }}
            source={{
              uri:
                "http://walyou.com/wp-content/uploads//2010/12/facebook-profile-picture-no-pic-avatar.jpg"
            }}
          />
          <Text
            style={{
              flex: 0.6,
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            Kevin
          </Text>
          <View style={{ flex: 0.3, flexDirection: "row" }}>
            <Icon type="font-awesome" name="plus-square" style={{ flex: 1 }} />
            <Text style={{ flex: 1 }}>19</Text>
            <Icon type="font-awesome" name="minus-square" style={{ flex: 1 }} />
          </View>
        </View>
        <Text
          style={{ flex: 1, color: "#b2bbc0", marginTop: 5, marginBottom: 10 }}
        >
          {dataRow.text_content || dataRow.content_text}
        </Text>
      </View>
    );
  }

  /**
   * Render Ask Field
   */
  _renderFooter() {}

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
   * Render Question detail
   */
  _renderHeader() {
    const Touchable =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    const qData = this.props.navigation.state.params.data;
    const { yes, no, all, yesPercent, noPercent } = this._getData(qData);
    return (
      <RkCard
        rkType="imgBlock"
        style={{
          marginVertical: 8,
          backgroundColor: "#fff",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingHorizontal: 10
        }}
      >
        {this._renderImage(qData)}
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
            style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
          >
            {qData.title}
          </RkText>
          <RkText style={{ marginTop: 5, color: "white" }}>5 hours ago</RkText>
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
                    borderRightWidth: 1,
                    backgroundColor: "#fff",
                    borderRightColor: "#b2bbc0"
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
                  >{`${qData.option1}`}</Text>
                </View>
              </Touchable>
            </View>
            <View style={{ flex: 1 }}>
              <Touchable style={{ flex: 1 }}>
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#fff"
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
                  >{`${qData.option2}`}</Text>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            height: 8,
            borderRadius: 50,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              backgroundColor: "#88c057",
              flex: yesPercent,
              borderRadius: 10
            }}
          />
          <View
            style={{
              backgroundColor: "#b2bbc0",
              flex: noPercent,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10
            }}
          />
        </View>
      </RkCard>
    );
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          flexDirection: "column"
        }}
      >
        <StatusBar backgroundColor="#88c057" barStyle="light-content" />
        <ListView
          style={{
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 8
          }}
          enableEmptySections
          dataSource={ds.cloneWithRows(
            this.props.navigation.state.params.data.answers || []
          )}
          renderHeader={this._renderHeader.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          renderRow={this._renderRow.bind(this)}
        />
        {/* <View style={{ flex: 1 }}>
          <RkTabView style={{ flex: 1 }}>
            <RkTabView.Tab title="All" style={{ flex: 1 }}>
              <ListView
                style={{ flex: 1 }}
                enableEmptySections
                dataSource={ds.cloneWithRows(data.all)}
                renderFooter={this._renderFooter.bind(this)}
                renderRow={this._renderRow.bind(this)}
              />
            </RkTabView.Tab>
            <RkTabView.Tab title={this.props.navigation.state.params.data.option1}>
              <ListView
                enableEmptySections
                dataSource={option1.cloneWithRows(data.option1)}
                renderFooter={this._renderFooter.bind(this)}
                renderRow={this._renderRow.bind(this)}
              />
            </RkTabView.Tab>
            <RkTabView.Tab title={this.props.navigation.state.params.data.option2}>
              <ListView
                enableEmptySections
                dataSource={option2.cloneWithRows(data.option2)}
                renderFooter={this._renderFooter.bind(this)}
                renderRow={this._renderRow.bind(this)}
              />
            </RkTabView.Tab>
          </RkTabView>
        </View> */}
      </View>
    );
  }
}

const styles = {
  wrapItem: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#b2bbc0"
  }
};

export default AnswerFeed;
