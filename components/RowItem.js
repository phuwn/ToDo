import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

class RowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value,
      _key: this.props._key,
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
      <View style={styles.rowContent}>
      
        <CheckBox
          checked={false}
          onPress={() => this.onCheckout()}
          uncheckedIcon='circle-o'
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <TextInput
            style={{ width: "90%", height:35 }}
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
    paddingBottom: 5,
    paddingTop: 10,
  }
});

export default RowItem;
