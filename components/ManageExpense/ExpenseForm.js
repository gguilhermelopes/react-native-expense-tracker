import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { setFormattedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input";

const ExpenseForm = ({ onCancel, onSubmit, isEditing, defaultValues }) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues
      ? defaultValues.amount.toString().replaceAll(".", ",")
      : "",
    date: defaultValues ? defaultValues.date.toLocaleDateString("pt-BR") : "",
    description: defaultValues ? defaultValues.description : "",
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount.replace(",", "."),
      date: new Date(setFormattedDate(inputValues.date)),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount >= 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Double check your inputs, please");
      return;
    }

    onSubmit(expenseData);
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.amountAndDateContainer}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
          style={styles.amountAndDateInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "DD/MM/YYYY",
            placeholderTextColor: GlobalStyles.colors.primary200,
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
          style={styles.amountAndDateInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  button: {
    minWidth: 120,
  },
});
