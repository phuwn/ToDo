import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

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
        <CheckBox checked={true} checkedIcon='check-circle' checkedColor='#0080ff'/>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <TextInput
            style={{ width: "90%", height:35}}
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
          <Ionicons name="md-arrow-dropdown-circle" color='#0080ff' size={25} />
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
    paddingRight: 10,
    paddingVertical: 10,
    backgroundColor: '#b3d9ff',
    
  }
});
