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
import { RkTheme, RkButton, RkCard, RkText, RkComponent } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import ActionButton from "react-native-action-button";
import data from "../sample/QuestionFeed";
import _ from "lodash";
import moment from 'moment';

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

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerTitleStyle: {
        color: '#fff',
        alignItems: 'center'
      },
      headerLeft: null,
      headerStyle: {
        backgroundColor: '#090e36'
      }
    };
  }

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
    }

    if (data.answers) {
      result.all = Object.keys(data.answers).length;
      if (result.all > 0 && !_.isEmpty(data.answers)) {
        _.forEach(data.answers, (v) => {
          if (v && v.answerType) {
            if (v.answerType == data.option1) {
              result.yes = result.yes + 1;
            } else if (v.answerType == data.option2) {
              result.no = result.no + 1;
            }
          }
        })

        result.yesPercent = result.yes / result.all;
        result.noPercent = result.no == 0 ? 0 : result.no / result.all;
        result.otherPercent = 1 - result.yesPercent - result.noPercent
      }
    }

    return result;
  }

  _renderImage(rowData) {
    if (rowData.image_url || rowData.image) {
      return (
        <Image rkCardImg source={{ uri: rowData.image || rowData.image_url }} />
      )
    } else {
      return (
        <View rkCardImg style={{ backgroundColor: "#ddd" }} />
      )
    }
  }

  /**
   * Render Row
   * @param {object} rowData 
   */
  renderRow(rowData, sectionID, rowID) {
    const { yes, no, all, yesPercent, noPercent, otherPercent } = this._getAnswerObject(rowData);
    const Touchable = Platform.OS == 'android' ? TouchableNativeFeedback : TouchableHighlight;
    return (
      <Touchable onPress={() => this.props.navigation.navigate("AnswerFeed", { data: rowData })} key={rowID}>
        <RkCard rkType="imgBlock" style={{ marginVertical: 8, backgroundColor: '#12194d' }}>
          {this._renderImage(rowData)}
          <View rkCardImgOverlay rkCardContent style={{ height: 85 }}>
            <RkText rkType="header4 inverseColor" style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{rowData.title}</RkText>
            <RkText style={{ marginTop: 5, color: 'white' }}>5 hours ago</RkText>
          </View>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
              <View style={{ marginRight: 10, justifyContent: 'center', flex: 1, borderRightWidth: 1, borderRightColor: '#ddd' }}>
                <RkButton rkType="clear">{`${yes == 0 ? '' : yes} ${rowData.option1}`}</RkButton>
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <RkButton rkType="clear">{`${no == 0 ? '' : no} ${rowData.option2}`}</RkButton>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, height: 5 }}>
            <View style={{ backgroundColor: 'green', flex: yesPercent }} />
            <View style={{ backgroundColor: 'blue', flex: noPercent }} />
            <View style={{ backgroundColor: 'grey', flex: otherPercent }} />
          </View>
        </RkCard>
      </Touchable>
    );
  }

  /**
   * Render View
   */
  render() {
    // console.log("questions", this.props.questions.posts);
    return (
      <View style={{ backgroundColor: '#0a1042', paddingVertical: 8, paddingHorizontal: 14, flex: 1 }}>
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
