import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Alert
} from "react-native";
import { Header } from "native-base";
import AddRow from "../components/AddRow.js";
import RowItem from "../components/RowItem.js";
import { firebaseApp } from "../constant/config.js";
import RowText from "../components/RowText.js";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class Complete extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref(this.props.userId);
    this.state = {
      done: []
    };
  }

  listenForItems(itemRef) {
    var dones = [];
    this.itemRef
      .child("checked")
      .on("child_added", dataSnapshot => {
        dones.push({
          value: dataSnapshot.val().Note,
          _key: dataSnapshot.key,
          key: dataSnapshot.key,
          _date: dataSnapshot.val().Date,
        });
        this.setState({
          done: dones
        });
      });
    this.itemRef
      .child("checked")
      .on("child_removed", dataSnapshot => {
        dones = dones.filter(x => x._key !== dataSnapshot.key);
        this.setState({
          done: dones
        });
      });
  }

  deleteRow = deletedkey => {
    Alert.alert("TODO", "Đã xóa");
    this.itemRef
      .child("checked")
      .child(deletedkey)
      .remove();
    this.listenForItems(this.itemRef);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.changePage("active");
            }}
          >
            <FontAwesome name="arrow-left" color="#fff" size={30} />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: 35,
              color: "#fff"
            }}
          >
            Done
          </Text>
        </View>
        <View style={styles.body}>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.done}
            renderItem={({ item }) => (
              <RowText
                value={item.value}
                _key={item._key}
                deleteRow={this.deleteRow}
                _date={item._date}
              />
            )}
          />
        </View>
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
  header: {
    flex: 1,
    backgroundColor: "#66ff99",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  body: {
    flex: 5,
    justifyContent: "flex-start",
  }
});
