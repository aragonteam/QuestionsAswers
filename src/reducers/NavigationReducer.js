import { NavigationActions } from "react-navigation";
import AppNavigator from "../navigation";

// const initialState = AppNavigator.router.getStateForAction(
//   AppNavigator.router.getActionForPathAndParams("Home")
// );

const initialState = AppNavigator.router.getStateForAction(
  NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: "Home"
      })
    ]
  })
);

export default (state = initialState, action) => {
  console.log(state, action);
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};
