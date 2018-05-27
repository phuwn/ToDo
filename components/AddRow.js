import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default class AddRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  onSubmit = () => {
    if (this.state.text.length > 0) this.props.addRow(this.state.text);
    this.setState({text : ''})
    return null;
  };

  render() {
    return (
      <View style={styles.rowContent}>
        <TouchableOpacity
          onPress={() => this.onCheckout()}
          style={{ paddingLeft: 15 , marginRight: 15 }}
        >
          <FontAwesome name="plus-circle" size={25} color="#0080ff"/>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <TextInput
            style={{ width: "90%", height:40}}
            placeholder="What u gonna do"
            onSubmitEditing={this.onSubmit}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={40}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.onSubmit()}
          style={{ paddingRight: 10 }}
        >
          <FontAwesome name="chevron-circle-down" color='#0080ff' size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContent: {
    // flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#b3d9ff',
    
  }
});
