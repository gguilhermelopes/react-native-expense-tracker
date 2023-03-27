import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({ expensesPeriod, expenses }) => {
  const expensesSum = expenses.reduce((acc, { amount }) => acc + amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{expensesPeriod}</Text>
      {
        <Text style={styles.sumText}>
          {expensesSum.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      }
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  periodText: {
    fontFamily: "dm-sans-bold",
    fontSize: 14,
    color: GlobalStyles.colors.primary700,
  },
  sumText: {
    fontFamily: "dm-sans-bold",
    fontSize: 16,
    color: GlobalStyles.colors.primary800,
  },
});
