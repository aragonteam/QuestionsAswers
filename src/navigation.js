import React, { Component } from "react";
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import QuestionFeed from "./components/QuestionFeed";
import AnswerFeed from "./components/AnswerFeed";
import CreateQuestion from "./components/CreateQuestion";
import SplashScreen from "./components/SplashScreen";
import Introduction from "./components/Introduction";
import CreateAnswer from "./components/CreateAnswer";
import Login from "./components/Login";
import ReactQuestion from "./components/ReactQuestion";
import Search from "./components/Search";
import Profile from "./components/Profile";

import { HeaderBackButton } from "react-navigation";

const MainDrawerNavigator = TabNavigator(
  {
    QuestionFeed: {
      screen: QuestionFeed
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "QuestionFeed",
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: "#060a25"
      }
    }
  }
);

const routeConfigs = {
  // Answer Feed Screen
  AnswerFeed: {
    screen: AnswerFeed
  },
  // Home Screen (include: Drawer + Question Feed)
  Home: {
    screen: QuestionFeed
  },
  // Create Question Screen
  CreateQuestion: {
    screen: CreateQuestion
  },
  //SplashScreen
  SplashScreen: {
    screen: SplashScreen
  },
  // Introdution screen
  Introduction: {
    screen: Introduction
  },
  // Create Answer Screen
  CreateAnswer: {
    screen: CreateAnswer
  },
  // Login Screen
  Login: {
    screen: Login
  }
};

export default StackNavigator(routeConfigs);
