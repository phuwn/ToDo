import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

class RowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value,
      _key: this.props._key,
      _date: this.props._date
    };
  }

  onCheckout = () => {
    if (this.state.text.length > 0) this.props.checkoutRow(this.state);
    return null;
  }

  onUpdate = () => {
    if (this.state.text.length > 0) this.props.updateRow(this.state);
    return null;
  };

  onDelete = () => {
      this.props.deleteRow(this.state._key);
  }

  render() {
    return (
      <View style={styles.body}>
      <View style={styles.rowContent}>
      
        <TouchableOpacity
          onPress={() => this.onCheckout()}
          style={{ paddingLeft: 15 , marginRight: 15 }}
        >
          <FontAwesome name="exclamation-circle" size={25} color="#fff"/>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <TextInput
            style={{ width: "90%", height:40 }}
            placeholder="What u gonna do"
            onSubmitEditing={this.onUpdate}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={40}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.onDelete()}
          style={{ paddingRight: 15 }}
        >
          <FontAwesome name="trash-o" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.date}>
      <Text>Created at: {this.state._date}</Text>
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
    // borderColor: "#b3d9ff",
    // borderWidth: 5,
    // backgroundColor: "#b3d9ff",
    // borderRadius: 8,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#b3d9ff",
    borderWidth: 5,
    backgroundColor: "#b3d9ff",
    borderRadius: 20,
  }
});

export default RowItem;
