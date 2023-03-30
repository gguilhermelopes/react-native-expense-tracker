import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const Loading = ({ style, color = "white" }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={color} />
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
});
