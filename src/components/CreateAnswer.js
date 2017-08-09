import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Button,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";
import PhotoUpload from "react-native-photo-upload";
import { getQuestions } from "../actions";
import firebaseApp from "../firebase/firebase";
import { connect } from "react-redux";

class CreateAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      answers: [],
      text_content: "",
      image: ""
    };
    this.writeDB = this.writeDB.bind(this);
  }

  writeDB() {
    var date = new Date();
    var milliseconds = date.getTime();
    var currentTime = milliseconds / 1000;
    let _text_content = this.state.title;
    let img = this.state.image;

    this.anwersRef.transaction(
      answers => {
        if (!answers) {
          answers = {};
        }
        answers[this.props.navigation.state.params.lastkey] = {
          created_time: currentTime,
          text_content: _text_content,
          answerType: "neutral",
          comments: {},
          image_content: img,
          downvote_number: 0,
          upvote_number: 0,
          question_id: 0,
          user_id: 1
        };
        return answers;
      },
      (err, commited, snapshot) => {
        this.props.getQuestions().then(() => {
          this.props.navigation.navigate("AnswerFeed", {
            data: this.props.questions.posts[
              this.props.navigation.state.params.rowID
            ],
            qID: this.props.navigation.state.params.qID,
            rowID: this.props.navigation.state.params.rowID
          });
        });
      }
    );
  }
  static navigationOptions = ({ navigation }) => {
    const { goToAnswerFeed } = navigation.state.params || {};
    const Touchable =
      Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight;
    return {
      title: "Create Answer",
      headerStyle: {
        backgroundColor: "#88c057"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerRight: (
        <Touchable onPress={goToAnswerFeed}>
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
      goToAnswerFeed: () => this.goToAnswerFeed()
    });

    this.anwersRef = firebaseApp
      .database()
      .ref(`questions/${this.props.navigation.state.params.qID}/answers`);
  }
  goToAnswerFeed() {
    this.writeDB();
  }

  countLetters(value) {
    this.setState({ count: value.length, text: value });
    this.setState({ title: value });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TextInput
          underlineColorAndroid={"transparent"}
          placeholder="Answer Content"
          multiline
          numberOfLines={5}
          onChangeText={text =>
            this.setState({
              title: text
            })}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#b2bbc0"
          }}
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

export default connect(mapStateToProps, { getQuestions })(CreateAnswer);
