import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    const getAsyncExpenses = async () => {
      const expensesData = await getExpenses();
      expensesContext.setExpenses(expensesData);
    };
    getAsyncExpenses();
  }, []);

  const dateSortedRecentExpenses = expensesContext.expenses
    .filter((expense) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);

      return expense.date > date7DaysAgo;
    })
    .sort((a, b) => b.date - a.date);

  return (
    <ExpensesOutput
      expenses={dateSortedRecentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days!"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
