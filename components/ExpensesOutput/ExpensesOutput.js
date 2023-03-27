import { StyleSheet, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const EXPENSES = [
  {
    id: "e1",
    description: "SSD",
    amount: 49.99,
    date: new Date("2023-01-18"),
  },
  {
    id: "e2",
    description: "PS5",
    amount: 1499.99,
    date: new Date("2023-03-10"),
  },
  {
    id: "e3",
    description: "iPhone",
    amount: 699.99,
    date: new Date("2023-02-20"),
  },
  {
    id: "e4",
    description: "Hollow Knight game",
    amount: 15.99,
    date: new Date("2023-03-20"),
  },
  {
    id: "e5",
    description: "HAND.CANNOT.ERASE. album",
    amount: 15.99,
    date: new Date("2022-12-15"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={EXPENSES} expensesPeriod={expensesPeriod} />
      <ExpensesList expenses={EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
