import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Header } from "native-base";
import { firebaseApp } from "../constant/config.js";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      hide: true
    };
  }

  signUp() {
    if (this.state.password.length < 6) {
      Alert.alert("TODO", "Password phải chứa ít nhất 6 kí tự");
      this.setState({
        password: "",
        repassword: ""
      });
    } else {
      if (this.state.password == this.state.repassword) {
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            Alert.alert("TODO", "Đăng kí tài khoản thành công");
            this.setState({
              email: "",
              password: "",
              repassword: ""
            });
            this.props.changePage("login");
          })
          .catch(function(error) {
            Alert.alert(
              "TODO",
              "Email đã tồn tại hoặc sai hình thức. Email không được bỏ trống , có dạng abcd@123.456 ( Không chứa các kí tự đặc biệt có dạng: !@#$%^&*<>,...)"
            );
          });
      } else {
        Alert.alert("TODO", "Mật khẩu không khớp vui lòng nhập lại");
        this.setState({
          password: "",
          repassword: ""
        });
      }
    }
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
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={70}
          style={styles.body}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: 30,
              color: "#4da6ff",
              marginBottom: 20
            }}
          >
            Sign Up
          </Text>
          <View style={styles.row}>
            <FontAwesome name="user" size={30} color="#fff" />
            <TextInput
              style={{ width: "80%", height: 45, marginLeft: 10 }}
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              autoCorrect={true}
              autoCapitalize="none"
              maxLength={40}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <FontAwesome name="lock" size={30} color="#fff" />
              <TextInput
                style={{ width: "85%", height: 45, marginLeft: 10 }}
                placeholder="Mật khẩu"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={this.state.hide}
                maxLength={40}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  hide: !this.state.hide
                });
              }}
            >
              <Ionicons name="md-eye-off" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <FontAwesome name="refresh" size={30} color="#fff" />
              <TextInput
                style={{ width: "85%", height: 45, marginLeft: 10 }}
                placeholder="Xác nhận lại mật khẩu"
                onChangeText={repassword => this.setState({ repassword })}
                value={this.state.repassword}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={this.state.hide}
                maxLength={40}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  hide: !this.state.hide
                });
              }}
            >
              <Ionicons name="md-eye-off" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.signupContent}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => {
                this.signUp();
              }}
            >
              <Text>Đăng kí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                this.props.changePage("login");
              }}
            >
              <Text>Quay về</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: "#4da6ff",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10
  },
  body: {
    flex: 5,
    paddingTop: 20,
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
    marginVertical: 10,
    justifyContent: "space-between"
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  signupContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15
  },
  backButton: {
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
