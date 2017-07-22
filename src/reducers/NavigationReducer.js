import { NavigationActions } from "react-navigation";
import AppNavigator from "../navigation";

import { Image } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'

// const initialState = AppNavigator.router.getStateForAction(
//   AppNavigator.router.getActionForPathAndParams("Home")
// );

const initialState = AppNavigator.router.getStateForAction(
  NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: "SplashScreen"
      })
    ]
  })
);

export default (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};
