import { StyleSheet, View } from "react-native";

import Input from "./Input";

const ExpenseForm = () => {
  const amountChangeHandler = () => {};

  return (
    <View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
        }}
      />
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangeHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({});
