import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

const Loading = ({ style, errorTextStyle, message, onConfirm }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, styles.error, errorTextStyle]}>
        An error occured!
      </Text>
      <Text style={[styles.text, styles.message, errorTextStyle]}>
        {message}
      </Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    color: GlobalStyles.colors.error50,
  },
  error: {
    fontFamily: "dm-sans-bold",
    fontSize: 18,
  },
  message: {
    fontFamily: "dm-sans",
    fontSize: 14,
    marginBottom: 16,
  },
});
