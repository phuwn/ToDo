import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity , Text } from "react-native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

class RowText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value,
      _key: this.props._key
    };
  }

  onDelete = () => {
    this.props.deleteRow(this.state._key);
  };

  render() {
    return (
      <View style={styles.body}>
      <View style={styles.rowContent}>
      <TouchableOpacity
        style={{ paddingLeft: 15 , marginRight: 15 }}
      >
        <FontAwesome name="check-circle" size={25} color="#fff"/>
      </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ width: "90%" , height:40 , paddingVertical:10 }}>
            {this.state.text}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => this.onDelete()}
          style={{ paddingRight: 15 }}
        >
          <FontAwesome name="trash-o" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.date}>
      <Text>Done at: {this.props._date}</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 35,
  },
  date: {
    alignItems: "flex-end",
    marginLeft: 5,
    // borderColor: "#66ff99",
    // borderWidth: 5,
    // backgroundColor: "#66ff99",
    // borderRadius: 8,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#66ff99",
    borderWidth: 5,
    backgroundColor: "#66ff99",
    borderRadius: 20,
  }
});

export default RowText;
