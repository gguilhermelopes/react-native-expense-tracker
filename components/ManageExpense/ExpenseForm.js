import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { setFormattedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input";

const ExpenseForm = ({ onCancel, onSubmit, isEditing, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues
        ? defaultValues.amount.toFixed(2).toString().replaceAll(".", ",")
        : "",
      isValid: true,
    },
    date: {
      value: defaultValues
        ? defaultValues.date.toLocaleDateString("pt-BR")
        : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value.replace(",", "."),
      date: new Date(setFormattedDate(inputs.date.value)),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: {
            value: currentInputs.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: currentInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.formContainer}>
      <View style={styles.amountAndDateContainer}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          invalid={!inputs.amount.isValid}
          style={styles.amountAndDateInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "DD/MM/YYYY",
            placeholderTextColor: GlobalStyles.colors.primary200,
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
          style={styles.amountAndDateInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Input values are invalid! Check entered data, please.
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    fontFamily: "dm-sans",
    color: GlobalStyles.colors.error500,
    marginHorizontal: 12,
    marginBottom: 24,
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
