import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import Input from "./Input";

const ExpenseForm = () => {
  const amountChangeHandler = () => {};

  return (
    <View style={styles.formContainer}>
      <View style={styles.amountAndDateContainer}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
          }}
          style={styles.amountAndDateInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            placeholderTextColor: GlobalStyles.colors.primary200,
            maxLength: 10,
            onChangeText: () => {},
          }}
          style={styles.amountAndDateInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
        }}
      />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 16,
  },
  amountAndDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountAndDateInput: {
    flex: 1,
  },
});
