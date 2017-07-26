import React, { Component } from "react";
import { View, Text,StatusBar,TextInput, Image, Button } from "react-native";
import PhotoUpload from 'react-native-photo-upload'

import firebaseApp from '../firebase/firebase'

class CreateQuestion extends Component {
  constructor(props){
      super(props);
      this.questionsRef = firebaseApp.database().ref('questions');
      this.state = {
          count: 0, 
          questions: [],
          title: "", 
          image: "", 
      };
      this.writeDB = this.writeDB.bind(this);
  }

  writeDB() {
    let currentTime = new Date().toDateString()//.toLocaleString()
    let _title = this.state.title
    let img = this.state.image
    
    this.questionsRef.transaction((questions) => {
        if (!questions) {
            questions = [];
        }
        questions.push({created_time: currentTime, 
                                                title: _title, 
                                                image: img, 
                                                no_number: 0, 
                                                yes_number: 0, 
                                                other_number: 0, 
                                                user_id: "Anonymous"})
        return questions;
    })  
  }
  static navigationOptions =  ({navigation}) => {
        const { goToQuestionFeed } = navigation.state.params || {}
        return {
            title: 'Create Question',
            headerRight: <Button title="Post" onPress={goToQuestionFeed}/>,
        }
    }
 componentDidMount() {
    let { navigation } = this.props
    navigation.setParams({
        goToQuestionFeed: () => this.goToQuestionFeed()
    })
 }
 goToQuestionFeed(){
    this.writeDB();
    this.props.navigation.navigate('QuestionFeed')
}

  countLetters(value) {
      this.setState({count:value.length, text:value});
      this.setState({title: value})
  }
  render() {
      var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

    return (
      <View style={{flex:1}}>
            <View style={{paddingTop: 5,backgroundColor: 'white'}}>
                <View style={{alignSelf: 'flex-end', height: 20}}>
                    <Text
                        style={{
                            fontSize: 17,
                            color: 'silver',
                        }}>{300 - (this.state.count)}
                    </Text>
                </View>
                <View style={{backgroundColor:'white', width:'100%',height: 145}}>
                  <TextInput onChangeText={(value) => this.countLetters(value) } 
                              editable={true} multiline={true} numberOfLines={5}
                              maxLength={300}
                              placeholder="Ask something"
                              autoFocus={true}
                              style={{margin:10, fontSize:17, 
                                      height:'93%', paddingBottom:0, 
                                      borderWidth: 1, borderColor: '#dcdcdc'}} />
                </View>
            </View>
            <View style={{flexDirection: 'row', backgroundColor:'white'}}>
                <View style={{backgroundColor:'white', width:'50%',height: 200}}>
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
                        paddingVertical: 20,
                        width: 140,
                        height: 140,
                        }}
                        resizeMode='cover'
                        source={{
                            uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                            }}
                    />
                </PhotoUpload> 
            </View> 
        </View>   
    </View>
    );
  }
}

export default CreateQuestion;
