import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  TextInput
} from "react-native";
import { Header } from "native-base";
import { firebaseApp } from "../constant/config.js";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  signIn() {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        Alert.alert("TODO", "Đăng nhập thành công");
        this.props.changePage("active", {
          userId: this.state.email
        });
      })
      .catch(function(error) {
        Alert.alert("TODO", "Sai tài khoản hoặc mật khẩu");
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: 35,
              color: "#fff",
              marginLeft: 10
            }}
          >
            TodoApp
          </Text>
        </View>
        <View style={styles.body}>
          <Text
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: 30,
              color: "red",
              marginBottom: 20
            }}
          >
            Login
          </Text>
          <View style={styles.row}>
            <FontAwesome name="user" size={30} color="#fff" />
            <TextInput
              style={{ width: "80%", height: 45, marginLeft: 10 }}
              placeholder="Tên đăng nhập"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              autoCorrect={true}
              autoCapitalize="none"
              maxLength={40}
            />
          </View>
          <View style={styles.row}>
            <FontAwesome name="lock" size={30} color="#fff" />
            <TextInput
              style={{ width: "80%", height: 45, marginLeft: 10 }}
              placeholder="Mật khẩu"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              maxLength={40}
            />
          </View>
          <View style={styles.loginContent}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.signIn();
              }}
            >
              <Text>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => {
                this.props.changePage("signup");
              }}
            >
              <Text>Đăng kí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    backgroundColor: "#ffcc00",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10
  },
  body: {
    flex: 5,
    paddingTop: 30,
    alignItems: "center",
    paddingHorizontal: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E3E2E2",
    borderWidth: 5,
    backgroundColor: "#E3E2E2",
    borderRadius: 20,
    paddingHorizontal: 5,
    marginVertical: 10
  },
  loginContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 5,
    backgroundColor: "red",
    borderRadius: 16,
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10
  },
  signupButton: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#009933",
    borderWidth: 5,
    backgroundColor: "#009933",
    borderRadius: 16,
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10
  }
});
