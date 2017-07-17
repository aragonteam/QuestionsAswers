import React, { Component } from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import QuestionFeed from "./components/QuestionFeed";
import AnswerFeed from "./components/AnswerFeed";
import CreateQuestion from "./components/CreateQuestion";
import SplashScreen from "./components/SplashScreen";
import Introduction from "./components/Introduction";
import CreateAnswer from "./components/CreateAnswer";
import Login from "./components/Login";

const MainDrawerNavigator = DrawerNavigator({
  QuestionFeed: {
    screen: QuestionFeed,
    navigationOptions: {
      title: "Home"
    }
  }
});

const routeConfigs = {
  AnswerFeed: {
    screen: AnswerFeed
  },
  QuestionFeed: {
    screen: MainDrawerNavigator
  },
  CreateQuestion: {
    screen: CreateQuestion
  },
  SplashScreen: {
    screen: SplashScreen
  },
  Introduction: {
    screen: Introduction
  },
  CreateAnswer: {
    screen: CreateAnswer
  },
  Login: {
    screen: Login
  }
};

export default StackNavigator(routeConfigs);
