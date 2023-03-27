import { Alert, StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect } from "react";

import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";

const ManageExpense = ({ route, navigation }) => {
  const expensesContext = useContext(ExpensesContext);
  const expenseId = route.params?.id;
  const expenseDesc = route.params?.description;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesContext.deleteExpense(expenseId);
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
            Alert.alert(`Expense deleted`);
            navigation.goBack();
          },
        },
      ]
    );
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    if (isEditing) {
      expensesContext.updateExpense(expenseId, {
        description: "External SSD",
        amount: 139.99,
        date: new Date("2023-03-24"),
      });
    } else {
      expensesContext.addExpense({
        description: "External HDD",
        amount: 39.99,
        date: new Date("2023-03-19"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  button: {
    minWidth: 120,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary100,
    alignItems: "center",
  },
});
