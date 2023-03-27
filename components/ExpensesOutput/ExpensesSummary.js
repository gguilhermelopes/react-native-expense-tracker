import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ExpensesSummary = ({ expensesPeriod, expenses }) => {
  const expensesSum = expenses.reduce((acc, { amount }) => acc + amount, 0);
  return (
    <View>
      <Text>{expensesPeriod}</Text>
      <Text>
        {expensesSum.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({});
