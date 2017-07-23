import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";

import TimerMixin from "react-timer-mixin";

const { width, height } = Dimensions.get("window");

class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 3000);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flex: 1,
            height: height,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white"
          }}
        >
          <Image
            source={require("../res/twitter_logo.png")}
            style={styles.logo}
          />
          <Text style={styles.slogan}>Connect with your friends</Text>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    flex: 1
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#4AB3F4",
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 8,
    marginTop: 30
  },
  buttonText: {
    color: "#4AB3F4",
    fontSize: 18
  },
  slogan: {
    marginTop: 10,
    fontSize: 15,
    color: "#B0B0B0"
  },
  logo: {
    width: 180,
    height: 146
  }
});

export default SplashScreen;
