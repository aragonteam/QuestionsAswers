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

import { HeaderBackButton } from "react-navigation";

const MainDrawerNavigator = DrawerNavigator(
  {
    QuestionFeed: {
      screen: QuestionFeed,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Feed",
          headerLeft: (
            <Icon.Button
              name="bars"
              backgroundColor="white"
              color="black"
              iconStyle={{ alignItems: "center" }}
              onPress={() => navigation.navigate("DrawerOpen")}
            />
          )
        };
      }
    }
  },
  {
    initialRouteName: "QuestionFeed",
    contentOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

const AnswerTabNavigator = TabNavigator(
  {
    AnswerAllScreen: {
      screen: ReactQuestion
    },
    AnswerYesScreen: {
      screen: ReactQuestion
    },
    AnswerNoScreen: {
      screen: ReactQuestion
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        color: "black"
      },
      style: {
        backgroundColor: "white"
      }
    }
  }
);

const routeConfigs = {
  // Answer Feed Screen
  AnswerFeed: {
    screen: AnswerFeed
  },
  ReactQuestion: {
    screen: AnswerTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        title: "Who reacted this question",
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.navigate("AnswerFeed")} />
        )
      };
    }
  },
  // Home Screen (include: Drawer + Question Feed)
  Home: {
    screen: MainDrawerNavigator
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
