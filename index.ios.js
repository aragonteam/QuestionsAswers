import React, { Component } from "react";
import { AppRegistry } from "react-native";

import App from "./src/app";
// import Profile from './src/components/Profile'
import {bootstrap} from './src/util/Setup'
// import ThemeService from './src/util/ThemeService'
import ProfileScreenBase from './src/blur_components/ProfileScreenBase'

bootstrap();

export default class QuestionsAnswers extends Component {
  render() {
    return <ProfileScreenBase />;
  }
}

AppRegistry.registerComponent("QuestionsAnswers", () => QuestionsAnswers);