import React, {Component} from 'react';
import {
  View,
  ScrollView
} from 'react-native';

import {RkStyleSheet, RkTabView} from 'react-native-ui-kitten';
import api from '../util/ApiMock';
// import ThemeService from "../util/ThemeService";
import ProfileBlur from './ProfileBlur'
import ProfileTab from './ProfileTab'

import FriendList from './FriendList';
import PostList from './PostList';
import ImageGallery from './ImageGallery';


export default class ProfileScreenBase extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    // let ProfileComponent = ThemeService.getProfileComponent();
    return (
      <View style={[{flex:1}, RkStyleSheet.transparentBg, RkStyleSheet.montserrat, RkStyleSheet.blurText]}>
        <ScrollView
          automaticallyAdjustContentInsets={true}>
          <ProfileBlur user={api.getUserInfo(api.userId)}/>
          <View
            style={{flex:1}}>
            {this._renderTabs()}
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderTabs() {
    let styles = ProfileTab.getStyles();
    return (
      <RkTabView tabsContainerStyle={styles.tabView}>
        <RkTabView.Tab title={(selected) => <ProfileTab selected={selected} name='Posts' value='62'/>}>
          <PostList style={styles.tabContent}
                    posts={api.getUserPosts(api.userId)}
                    iconStyle={styles.postIconsStyle}/>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => <ProfileTab selected={selected} name='Followers' value='124'/>}>
          <View style={styles.tabContent}>
            <FriendList friends={api.getUserFriends(api.userId)}/>
          </View>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => <ProfileTab selected={selected} name='Photo' value='48'/>}>
          <View style={styles.tabContent}>
            <ImageGallery style={styles.imageTab} posts={api.getUserPosts(api.userId)}/>
          </View>
        </RkTabView.Tab>
      </RkTabView>
    );
  }

}

