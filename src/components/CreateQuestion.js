import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import PhotoUpload from "react-native-photo-upload";
import firebaseApp from "../firebase/firebase";
import ModalDropdown from "react-native-modal-dropdown";
import moment from "moment";
import { getQuestions } from "../actions";
import { connect } from "react-redux";
import _ from "lodash";

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.questionsRef = firebaseApp.database().ref("questions");
    this.state = {
      count: 0,
      questions: [],
      title: "",
      image: "",
      selectedCategory: [],
      dropdown_icon_heart: true,
      option1: "",
      option2: ""
    };
    this.writeDB = this.writeDB.bind(this);
  }

  writeDB() {
    var date = new Date();
    var milliseconds = date.getTime();
    var currentTime = milliseconds / 1000;
    let _title = this.state.title;
    let img = this.state.image;
    let selectedCategory = this.state.selectedCategory;

    let _option1 = this.state.option1;
    let _option2 = this.state.option2;
    if (this.state.option1 === "") {
      _option1 = "Yes";
      _option2 = "No";
    }

    this.questionsRef.transaction(
      currentData => {
        if (_.isEmpty(currentData)) {
          currentData = {};
        }
        // alert(JSON.stringify(currentData));
        currentData[Object.keys(this.props.questions.posts).length] = {
          answers: {},
          image: img,
          title: _title,
          option1: _option1,
          option2: _option2,
          categories: selectedCategory,
          created_time: currentTime
        };

        return currentData;
      },
      (err, commited, snapshot) => {
        // if (!err && commited) {
        this.props.getQuestions().then(() => {
          this.props.navigation.navigate("QuestionFeed");
        });
        // }
      }
    );

    // this.questionsRef.update()
  }
  static navigationOptions = ({ navigation }) => {
    const { goToQuestionFeed } = navigation.state.params || {};
    return {
      title: "Create Question",
      headerRight: <Button title="Post" onPress={goToQuestionFeed} />
    };
  };
  componentDidMount() {
    let { navigation } = this.props;
    navigation.setParams({
      goToQuestionFeed: () => this.goToQuestionFeed()
    });
  }
  goToQuestionFeed() {
    this.writeDB();
  }

  countLetters(value) {
    this.setState({ count: value.length, text: value });
    this.setState({ title: value });
  }

  _dropdown_renderRow(rowData, rowID, highlighted) {
    let icon = highlighted
      ? require("../resources/heart.png")
      : require("../resources/uncheck.png");
    return (
      <TouchableHighlight underlayColor="white">
        <View style={[styles.dropdown_row, { backgroundColor: "white" }]}>
          <Text
            style={[
              styles.dropdown_row_text,
              highlighted && { color: "mediumaquamarine" }
            ]}
          >
            {`${rowData}`}
          </Text>
          <Image style={styles.dropdown_image} mode="stretch" source={icon} />
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    var base64Icon =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=";
    const categoryOptions = [
      "Food",
      "Music",
      "Science",
      "Fashion",
      "Religion",
      "Brands",
      "Art",
      "Gaming",
      "Economics",
      "News",
      "Politics",
      "Society",
      "Tech",
      "TV & Movie"
    ];
    let dropdown_icon = this.state.dropdown_icon_heart
      ? require("../resources/heart.png")
      : require("../resources/uncheck.png");
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="yellow" barStyle="light-content" />
        <View style={{ paddingTop: 5, backgroundColor: "white" }}>
          <View style={{ marginTop: 20, height: 20 }}>
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  console.log("Image base64 string: ", avatar);
                  this.setState({
                    image: "data:image/png;base64," + avatar
                  });
                }
              }}
            >
              <Image
                style={{
                  paddingTop: 30,
                  width: 40,
                  height: 40
                }}
                resizeMode="cover"
                source={require("../resources/icon_image.png")}
              />
            </PhotoUpload>
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: 100,
              marginTop: 40
            }}
          >
            <TextInput
              onChangeText={value => this.countLetters(value)}
              editable={true}
              maxLength={140}
              multiline={true}
              numberOfLines={3}
              placeholder="Enter your question title here"
              autoFocus={true}
              style={{
                margin: 10,
                fontSize: 17,
                height: "85%",
                paddingBottom: 0
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={{
                height: 40,
                width: 80,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                marginLeft: 20,
                borderRadius: 7,
                textAlign: "center",
                backgroundColor: "cornflowerblue"
              }}
              onChangeText={option1 => this.setState({ option1 })}
              value={this.state.option1}
              placeholder="option1"
            />
            <TextInput
              style={{
                height: 40,
                width: 80,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                marginRight: 20,
                borderRadius: 7,
                textAlign: "center",
                backgroundColor: "mediumaquamarine"
              }}
              onChangeText={option2 => this.setState({ option2 })}
              value={this.state.option2}
              placeholder="option2"
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <ModalDropdown
              style={{
                marginLeft: 6,
                paddingTop: 4,
                paddingBottom: 6,
                backgroundColor: "#d11141",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
                marginTop: 2,
                marginLeft: 8,
                marginRight: 8
              }}
              textStyle={(styles.dropdown_text, styles.dropdown_row_text)}
              defaultIndex={this.state.selectedCategory}
              dropdownStyle={styles.dropdown_dropdown}
              options={categoryOptions}
              onSelect={(index, value) =>
                this.setState({
                  selectedCategory: { index: index, text: value }
                })}
              renderRow={this._dropdown_renderRow.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dropdown: {
    alignSelf: "center",
    top: 32,
    right: 8,
    justifyContent: "space-between",
    backgroundColor: "cornflowerblue"
  },
  dropdown_text: {
    fontSize: 22,
    color: "white",
    textAlign: "center"
  },
  dropdown_dropdown: {
    marginTop: 10,
    height: 253
  },
  dropdown_row: {
    borderTopColor: "white",
    width: "90%",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdown_image: {
    width: 30,
    height: 30
  },
  dropdown_row_text: {
    marginHorizontal: 14,
    fontSize: 22,
    color: "navy",
    textAlignVertical: "center"
  }
});

const mapStateToProps = state => {
  return {
    questions: state.questions
  };
};

export default connect(mapStateToProps, { getQuestions })(CreateQuestion);
