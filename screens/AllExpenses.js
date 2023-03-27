import { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const dateSortedExpenses = expensesContext.expenses.sort(
    (a, b) => b.date - a.date
  );

  return (
    <ExpensesOutput expenses={dateSortedExpenses} expensesPeriod="Total" />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
