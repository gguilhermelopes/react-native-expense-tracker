import { Alert, StyleSheet, View, Text } from "react-native";
import { useContext, useLayoutEffect } from "react";

import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
  const expensesContext = useContext(ExpensesContext);
  const expenseId = route.params?.id;
  const expenseDesc = route.params?.description;
  const isEditing = !!expenseId;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    Alert.alert(
      "Are you sure?",
      `Do you really want to delete ${expenseDesc}? This can't be undone!`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            expensesContext.deleteExpense(expenseId);
            Alert.alert("Expense deleted");
            navigation.goBack();
          },
        },
      ]
    );
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expensesContext.updateExpense(expenseId, expenseData);
    } else {
      expensesContext.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {expenseDesc && <Text style={styles.title}>{expenseDesc}</Text>}
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  title: {
    fontFamily: "dm-sans-bold",
    fontSize: 16,
    textAlign: "center",
    color: GlobalStyles.colors.primary700,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary100,
    alignItems: "center",
  },
});
