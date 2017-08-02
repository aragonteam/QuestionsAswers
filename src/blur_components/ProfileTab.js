import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import {RkTheme} from 'react-native-ui-kitten';
import ProfileTabBase from "./ProfileTabBase";

export default class ProfileTab extends ProfileTabBase {

  getStyles(){
    return styles;
  }

  static getStyles = () => styles;

}

const styles = StyleSheet.create({
  statContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 35,
    padding: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  statContainerSelected: {
    borderColor: RkTheme.colors.blurPrimary,
    backgroundColor: RkTheme.colors.blurBg,
  },
  titleStatText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  statText: {
    textAlign: 'center',
    fontSize: 14,
    color: RkTheme.colors.white
  },
  tabView: {
    backgroundColor: RkTheme.colors.blurBg,
    margin: 10,
    borderRadius: 35,
  },
  tabContent: {
    marginTop: 10,
    backgroundColor: RkTheme.colors.blurBg
  },
});