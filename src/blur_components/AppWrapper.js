import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';

// import {RkConfig, RkBarBg} from 'react-native-ui-kitten';
import {BlurStyle, BlurColor} from './BlurStyle'
import RkBarBg from './RkBarBg'

export default class AppWrapper extends Component {

  // static tabProps={
  //   tintColor: RkConfig.colors.white,
  //   barTintColor: RkConfig.colors.black
  // };

  render(){
    return(
    <Image
      source={require('../res/blurBg.png')}
      style={BlurStyle.backgroundImage}>
      {this.props.children}
      <StatusBar
        barStyle="light-content"
      />
       <RkBarBg style={styles.bar}/> 
    </Image>
    )
  }

}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
});
