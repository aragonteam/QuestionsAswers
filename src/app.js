import React, { Component } from "react";
import { View, Text } from "react-native";
import { Provider } from "react-redux";

import configureStore from "./store";
import NavigationWithRedux from "./components/Navigation";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      store:
      module && module.hot && module.hot.data && module.hot.data.store
        ? module.hot.data.store
        : configureStore(() => {
          this.setState({
            isLoading: false
          });
        })
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <NavigationWithRedux />
      </Provider>
    );
  }
}

export default App;

