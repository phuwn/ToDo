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
      <View style={styles.rowContent}>
        <CheckBox
          checked={true}
          checkedIcon='check-circle'
          checkedColor='#33cc33'
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ width: "90%" , height:35 , paddingVertical:10 }}>
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

export default RowText;
