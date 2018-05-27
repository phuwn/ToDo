import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Header } from "native-base";
import AddRow from "../components/AddRow.js";
import RowItem from "../components/RowItem.js";
import { firebaseApp } from "../constant/config.js";
import RowText from "../components/RowText.js";
import { StackNavigator } from "react-navigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default class Active extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      todo: []
    };
  }

  listenForItems(itemRef) {
    var items = [];
    this.itemRef
      .ref(this.props.userId)
      .child("unchecked")
      .on("child_added", dataSnapshot => {
        items.push({
          value: dataSnapshot.val().Note,
          _key: dataSnapshot.key,
          key: dataSnapshot.key
        });
        this.setState({
          todo: items
        });
      });
    this.itemRef
      .ref(this.props.userId)
      .child("unchecked")
      .on("child_removed", dataSnapshot => {
        items = items.filter(x => x._key !== dataSnapshot.key);
        this.setState({
          todo: items
        });
      });
  }

  addRow = newvalue => {
    this.itemRef
      .ref(this.props.userId)
      .child("unchecked")
      .push({
        Note: newvalue
      });
  };

  checkoutRow = checkobject => {
    this.itemRef
      .ref(this.props.userId)
      .child("checked")
      .push({
        Note: checkobject.text
      });
    Alert.alert("TODO", "Hoàn thành");
    this.itemRef
      .ref(this.props.userId)
      .child("unchecked")
      .child(checkobject._key)
      .remove();
    this.listenForItems(this.itemRef);
  };

  updateRow = newobject => {
    this.itemRef
      .ref(this.props.userId)
      .child("unchecked")
      .child(newobject._key)
      .set({
        Note: newobject.text
      });
  };

  deleteRow = deletedkey => {
    Alert.alert("TODO", "Xóa phần việc chưa hoàn tất ?", [
      {
        text: "Ok",
        onPress: () => {
          this.itemRef
            .ref(this.props.userId)
            .child("unchecked")
            .child(deletedkey)
            .remove();
          this.listenForItems(this.itemRef);
        }
      },
      {
        text: "Cancel",
        onPress: () => console.log("CancelRequested"),
        style: "cancel"
      }
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.sheader}>
            <TouchableOpacity
              onPress={() => {
                firebaseApp
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.changePage("login");
                    Alert.alert("TODO", "Đăng xuất thành công");
                  })
                  .catch(function(error) {
                    Alert.alert("TODO", "An error occur");
                  });
              }}
            >
              <FontAwesome name="user-circle-o" size={30} color="#fff" />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 35,
                color: "#fff",
                marginLeft: 10
              }}
            >
              ToDo
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.changePage("complete", {
                userId: this.props.userId
              });
            }}
          >
            <FontAwesome name="check-square-o" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={25}
          style={styles.body}
        >
          <AddRow addRow={this.addRow} />

          <FlatList
            style={{ width: "100%" }}
            data={this.state.todo}
            renderItem={({ item }) => (
              <RowItem
                value={item.value}
                _key={item._key}
                checkoutRow={this.checkoutRow}
                updateRow={this.updateRow}
                deleteRow={this.deleteRow}
              />
            )}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }

  componentDidMount() {
    this.listenForItems(this.itemRef);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sheader: {
    flexDirection: "row",
    alignItems: "center"
  },
  header: {
    flex: 1,
    backgroundColor: "#4da6ff",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  body: {
    flex: 5,
    justifyContent: "flex-start"
  }
});
