import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, textInputConfig, style, invalid }) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontFamily: "dm-sans",
    fontSize: 12,
    color: GlobalStyles.colors.primary700,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 12,
    borderRadius: 6,
    fontSize: 18,
    fontFamily: "dm-sans",
    color: GlobalStyles.colors.primary25,
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    borderColor: GlobalStyles.colors.error500,
  },
});
