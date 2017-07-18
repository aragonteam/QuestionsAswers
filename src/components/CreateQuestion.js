import React, { Component } from "react";
import { View, Text,StatusBar,TextInput, Image, Button } from "react-native";
import PhotoUpload from 'react-native-photo-upload'

class CreateQuestion extends Component {
  state = {};
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
        this.props.navigation.navigate('QuestionFeed')
    }

  countLetters(value) {
      this.setState({count:value.length, text:value});
  }
  render() {
    return (
      <View style={{flex:1}}>
            <View style={{paddingTop: 5,backgroundColor: 'white'}}>
                <View style={{alignSelf: 'flex-end', height: 20}}>
                    <Text
                        style={{
                            fontSize: 17,
                            color: 'silver',
                        }}>{this.state.count}
                    </Text>
                </View>
                <View style={{backgroundColor:'white', width:'100%',height: 250}}>
                  <TextInput onChangeText={(value) => this.countLetters(value) } 
                              editable={true} multiline={true} numberOfLines={5}
                              placeholder="Ask something"
                              style={{margin:10, fontSize:17, 
                                      height:'90%', paddingBottom:0, 
                                      borderWidth: 1, borderColor: '#dcdcdc'}} />
                </View>
            </View>
            <View style={{flexDirection: 'row', backgroundColor:'white'}}>
                <View style={{backgroundColor:'white', width:'50%',height: 200}}>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                        console.log('Image base64 string: ', avatar)
                        }
                    }}
                    >
                    <Image
                        style={{
                        paddingVertical: 30,
                        width: 150,
                        height: 150,
                        borderRadius: 75
                        }}
                        resizeMode='cover'
                        source={{
                            uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                            }}
                    />
                </PhotoUpload> 
            </View> 
            <View style={{backgroundColor:'white', width:'50%',height: 200}}>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                        console.log('Image base64 string: ', avatar)
                        }
                    }}
                    >
                    <Image
                        style={{
                        paddingVertical: 30,
                        width: 150,
                        height: 150,
                        borderRadius: 75
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
