import {
  Alert,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { useContext, useLayoutEffect, useState } from "react";

import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";
import { ScrollView } from "react-native";

const ManageExpense = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
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
          onPress: async () => {
            setLoading(true);
            try {
              await deleteExpense(expenseId);
              expensesContext.deleteExpense(expenseId);
              Alert.alert("Expense deleted");
              navigation.goBack();
            } catch (error) {
              setLoading(false);
              setError("Could not delete expense - please try again later!");
            }
          },
        },
      ]
    );
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      Alert.alert(
        "Edit expense",
        `Do you really want to update ${expenseDesc}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Update",
            style: "default",
            onPress: async () => {
              setLoading(true);
              try {
                await updateExpense(expenseId, expenseData);
                expensesContext.updateExpense(expenseId, expenseData);
                Alert.alert("Expense updated!");
                navigation.goBack();
              } catch (error) {
                setError("Could not update expense - please try again later!");
                setLoading(false);
              }
            },
          },
        ]
      );
    } else {
      setLoading(true);
      try {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id });
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        setError("Could not add expense - please try again later!");
      }
    }
  };

  if (loading) {
    return (
      <Loading
        style={{ backgroundColor: GlobalStyles.colors.primary50 }}
        color={GlobalStyles.colors.primary500}
      />
    );
  }

  const handleError = () => {
    setError(null);
  };
  if (error && !loading) {
    return (
      <Error
        message={error}
        style={{ backgroundColor: GlobalStyles.colors.primary50 }}
        errorTextStyle={{ color: GlobalStyles.colors.error500 }}
        onConfirm={handleError}
      />
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  container: {
    flex: 1,
    padding: 24,
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
