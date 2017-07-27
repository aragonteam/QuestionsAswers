import React, { Component } from "react";
import { View, Text,StatusBar,TextInput, Image, Button } from "react-native";
import PhotoUpload from 'react-native-photo-upload'

import firebaseApp from '../firebase/firebase'

class CreateAnswer extends Component {
  constructor(props){
      super(props);
      this
      this.anwersRef = firebaseApp.database().ref('questions/0/answers');
      this.state = {
          count: 0, 
          answers: [],
          text_content: "", 
          image: "", 
      };
      this.writeDB = this.writeDB.bind(this);
  }

  writeDB() {
    let currentTime = new Date().toDateString()//.toLocaleString()
    let _text_content = this.state.title
    let img = this.state.image
    
    this.anwersRef.transaction((answers) => {
        if (!answers) {
            answers = [];
        }
        answers.push({created_time: currentTime, 
                                                text_content: _text_content, 
                                                answerType: "neutral",
                                                comments: {},
                                                image_content: img, 
                                                downvote_number: 0, 
                                                upvote_number: 0, 
                                                question_id: 0,
                                                user_id: "Anonymous"})
        return answers;
    })  
  }
  static navigationOptions =  ({navigation}) => {
        const { goToAnswerFeed } = navigation.state.params || {}
        return {
            title: 'Create Answer',
            headerRight: <Button title="Post" onPress={goToAnswerFeed}/>,
        }
    }
 componentDidMount() {
    let { navigation } = this.props
    navigation.setParams({
        goToAnswerFeed: () => this.goToAnswerFeed()
    })
 }
 goToAnswerFeed(){
    this.writeDB();
    this.props.navigation.navigate('AnswerFeed')
}

  countLetters(value) {
      this.setState({count:value.length, text:value});
      this.setState({title: value})
  }
  render() {
      var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
            <View style={{marginTop: 20, height: 40}}>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                            console.log('Image base64 string: ', avatar)
                            this.setState({
                                image : "data:image/png;base64," + avatar
                            })
                        }
                    }}>
                    <Image
                        style={{
                            paddingTop: 30,
                            width: 40,
                            height: 40,
                        }}
                        resizeMode='cover'
                        source={require('../resources/icon_image.png')}
                    />
                </PhotoUpload> 
            </View>
            <View style={{paddingTop: 5,backgroundColor: 'white'}}>
                <View style={{alignSelf: 'flex-end', height: 20, marginRight:14}}>
                    <Text
                        style={{
                            fontSize: 17,
                            color: 'silver',
                        }}>{500 - (this.state.count)}
                    </Text>
                </View>
                <View style={{backgroundColor:'white', width:'100%',height: 250}}>
                  <TextInput onChangeText={(value) => this.countLetters(value) } 
                              editable={true} multiline={true} numberOfLines={11}
                              maxLength={500}
                              placeholder="Enter your answer here..."
                              autoFocus={true}
                              style={{margin:10, fontSize:17, 
                                       height:'95%', paddingBottom:0,  
                                      }} />
                </View>
                <Text>
                  if 
                </Text>
            </View>
    </View>
    );
  }
}

export default CreateAnswer;
