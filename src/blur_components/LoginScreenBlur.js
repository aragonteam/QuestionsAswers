import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Image,
  Text,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {RkButton, RkText, RkTextInput, RkSeparator} from 'react-native-ui-kitten';
import AppWrapper from './AppWrapper'
import {BlurStyle, BlurColor} from './BlurStyle'

export default class LoginScreenBlur extends Component {

  render() {
    // let AppWrapper = ThemeService.getAppWrapperComponent();
    return (
      <AppWrapper>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logoImg} source={require('../res/react_logo.png')}/>
              <RkText style={styles.title}><RkText style={styles.extraBold}>React</RkText> Native</RkText>
              <RkText style={styles.subTitle}>Essentials</RkText>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.widthLimit}>
                  <RkTextInput
                    rkType='rounded'
                    containerStyle={styles.inputContainer}
                    label={<Icon name='ios-person-outline'/>}
                    labelStyle={styles.inputIcon}
                    style={styles.input}
                    placeholder={'Login'}
                    placeholderTextColor={BlurColor.lightGray}/>
                  <RkTextInput
                    rkType='rounded'
                    containerStyle={styles.inputContainer}
                    label={<Icon name='ios-lock-outline'/>}
                    labelStyle={[styles.inputIcon, styles.inputIconLock]}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder={'Password'}
                    placeholderTextColor={BlurColor.lightGray}/>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={styles.widthLimit}>
                <RkButton innerStyle={styles.buttonInner}
                          style={styles.buttonContainer}
                          rkType='circle shadow'
                          onPress={() => super._renderMainScreen()}>
                  <RkText>Log In</RkText>
                </RkButton>
              </View>
            </View>
            <RkText style={styles.footText}>
              Don't have account? <Text style={styles.extraBold}>Sign up</Text>.
            </RkText>
          </View>
        </ScrollView>
      </AppWrapper>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 70,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  widthLimit: {
    flex: 1,
    maxWidth: 275,
    minHeight: 120,
  },
  logoImg: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  title: {
    marginTop: 5,
    fontSize: 42,
    textAlign: 'center',
    fontWeight: '500'
  },
  subTitle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 30
  },
  inputContainer: {
    backgroundColor: BlurColor.blurBgWhite,
    marginTop: 15,
    paddingLeft: 15,
  },
  inputIcon: {
    color: 'white',
    fontSize: 28,
    fontWeight: '300'
  },
  inputIconLock: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    color: 'white',
    fontWeight: '300',
    fontSize: 20,
    textAlign: 'left',
    height: 40,
    marginHorizontal: 10
  },
  footText: {
    marginVertical: 30,
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    backgroundColor: BlurColor.blurPrimary,
    shadowColor: BlurColor.blurPrimary,
    paddingVertical: 12,
    shadowRadius: 12,
    shadowOpacity: 0.4,
    marginTop: 40,
  },
  buttonInner: {
    fontSize: 22,
    color: 'white',
  },
  extraBold: {
    fontWeight: '700'
  }
});
