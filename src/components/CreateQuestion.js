import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
  Platform,
  TouchableNativeFeedback
} from "react-native";
import PhotoUpload from "react-native-photo-upload";
import Icon from "react-native-vector-icons/FontAwesome";
import firebaseApp from "../firebase/firebase";
import ModalDropdown from "react-native-modal-dropdown";
import moment from "moment";
import { getQuestions } from "../actions";
import { connect } from "react-redux";
import _ from "lodash";
import { HeaderBackButton } from "react-navigation";

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
    this._renderUploadImage = this._renderUploadImage.bind(this);
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
    const Touchable =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    return {
      title: "Create Question",
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
        <Touchable onPress={goToQuestionFeed}>
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
            Save
          </Text>
        </Touchable>
      )
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

  _renderUploadImage() {
    const Touchable =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    if (this.state.image) {
      return (
        <View style={{ height: 250, position: "relative" }}>
          <Image
            resizeMode="cover"
            source={{ uri: this.state.image }}
            style={{ flex: 1, height: 250 }}
          />
          <PhotoUpload
            containerStyle={{
              backgroundColor: "transparent",
              position: "absolute",
              right: 10,
              top: 10
            }}
            onPhotoSelect={avatar => {
              if (avatar) {
                this.setState({
                  image: "data:image/png;base64," + avatar
                });
              }
            }}
          >
            <Icon name="camera" size={32} color="white" />
          </PhotoUpload>
        </View>
      );
    } else {
      return (
        <View style={{ height: 250 }}>
          <PhotoUpload
            containerStyle={{ backgroundColor: "#ddd" }}
            onPhotoSelect={avatar => {
              if (avatar) {
                this.setState({
                  image: "data:image/png;base64," + avatar
                });
              }
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 50,
                backgroundColor: "#ddd"
              }}
            >
              <Icon name="camera" size={80} />
              <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 5 }}>
                UPLOAD QUESTION COVER IMAGE
              </Text>
            </View>
          </PhotoUpload>
        </View>
      );
    }
  }

  render() {
    const Touchable =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#88c057" barStyle="light-content" />
        {this._renderUploadImage()}
        <TextInput
          placeholder="Question Title"
          onChangeText={text =>
            this.setState({
              title: text
            })}
          value={this.state.title}
          underlineColorAndroid={"transparent"}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#b2bbc0",
            paddingLeft: 20,
            fontWeight: "bold",
            fontSize: 16
          }}
        />
        <TextInput
          placeholder="Option 1"
          onChangeText={text =>
            this.setState({
              option1: text
            })}
          value={this.state.option1}
          underlineColorAndroid={"transparent"}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#b2bbc0",
            paddingLeft: 20,
            fontWeight: "bold",
            fontSize: 16
          }}
        />
        <TextInput
          placeholder="Option 2"
          onChangeText={text =>
            this.setState({
              option2: text
            })}
          value={this.state.option2}
          underlineColorAndroid={"transparent"}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#b2bbc0",
            paddingLeft: 20,
            fontWeight: "bold",
            fontSize: 16
          }}
        />
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
