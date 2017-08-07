import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
import { RkTabView, RkCard, RkText } from "react-native-ui-kitten";
import { HeaderBackButton } from "react-navigation";
import data from "../sample/AnswerFeed";
import _ from "lodash";

class AnswerFeed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.data.title,
      headerLeft: (
        <HeaderBackButton
          onPress={() => navigation.navigate("Home")}
          tintColor="white"
        />
      ),
      headerStyle: {
        backgroundColor: "#090e36"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerRight: (
        <Button
          title="Answer"
          onPress={() =>
            navigation.navigate("CreateAnswer", {
              qID: navigation.state.params.qID,
              rowID: navigation.state.params.rowID,
              lastkey: Object.keys(navigation.state.params.data.answers || {})
                .length
            })}
        />
      )
    };
  };

  constructor() {
    super();

    this._getData = this._getData.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  _getData() {
    let result = {
      option1: [],
      option2: [],
      all: []
    };

    const data = this.props.navigation.state.params.data;

    if (data.answers) {
      if (!_.isEmpty(data.answers)) {
        _.forEach(data.answers, v => {
          result.all.push(v);
          if (v && v.answerType) {
            if (v.answerType == data.option1) {
              result.option1.push(v);
            } else if (v.answerType == data.option2) {
              result.option2.push(2);
            }
          }
        });
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
          <Text style={{ color: "white" }}>
            {dataRow && dataRow.text_content}
          </Text>
        </View>
        <View style={{ flex: 0.05 }}>
          <Icon
            type="font-awesome"
            name="chevron-up"
            size={18}
            color="white"
            onPress={() => this._voteAction(rowId, "up")}
          />
          <Text style={{ color: "white" }}>+19</Text>
          <Icon
            type="font-awesome"
            name="chevron-down"
            size={18}
            color="white"
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

  _renderImage() {}

  /**
   * Render Question detail
   */
  _renderHeader() {
    const Touchable =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    const qData = this.props.navigation.state.params.data;
    return (
      <RkCard style={{ flex: 1 }}>
        <Image
          rkCardImg
          source={{ uri: qData.image_url || qData.image }}
          style={{ flex: 1, height: 200, backgroundColor: "#ddd" }}
        />
        <View rkCardHeader>
          <View>
            <RkText style={{ fontSize: 18, fontWeight: "bold" }}>
              {qData.title}
            </RkText>
            <RkText>5 hours ago</RkText>
          </View>
        </View>
      </RkCard>
    );
  }

  render() {
    const data = this._getData();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    const option1 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    const option2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    return (
      <View
        style={{
          backgroundColor: "#0a1042",
          flex: 1,
          flexDirection: "column"
        }}
      >
        {}
        <ListView
          style={{ flex: 1 }}
          enableEmptySections
          dataSource={ds.cloneWithRows(data.all)}
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
    marginHorizontal: 16,
    color: "white"
  },
  itemHead: {
    flexDirection: "row",
    flex: 1
  },
  userNameStyle: {
    // alignSelf: "left"
    color: "white",
    fontWeight: "bold"
  },
  timeDiffStyle: {
    // alignSelf: "left"
    color: "white",
    marginLeft: 5
  }
};

export default AnswerFeed;
