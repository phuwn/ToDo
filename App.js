import Expo from "expo";
import React, { Component } from "react";
import { StatusBar, View, Button , Text } from "react-native";
import Active from "./screens/Active";
import Complete from "./screens/Complete";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { createStackNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";


class ActiveScreen extends Component {
  render() {
    const pos = this.props.navigation.getParam('userId');
var userId = pos.replace(".","p");
    return (
      <Active changePage={this.props.navigation.navigate} userId = {userId}/>
    );
  }
}

class CompleteScreen extends Component {
  render() {
    const pos = this.props.navigation.getParam('userId');
var userId = pos.replace(".","p");
    return (
      <Complete changePage={this.props.navigation.navigate} userId = {userId}/>
    );
  }
}

class LoginScreen extends Component {
  render() {
    return (
      <Login changePage={this.props.navigation.navigate}/>
    );
  }
}

class SignupScreen extends Component {
  render() {
    return (
      <Signup changePage={this.props.navigation.navigate}/>
    );
  }
}


const RootStack = createStackNavigator(
  {
    active: ActiveScreen,
    complete: CompleteScreen,
    login: LoginScreen,
    signup: SignupScreen,
  },
  {
    initialRouteName: "login",
    navigationOptions: {
      header:null,
    },
  }
);




export default class ToDo extends Component {

  render() {
    return <RootStack/>;

  }
}
