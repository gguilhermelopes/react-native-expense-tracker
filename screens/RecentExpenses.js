import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import Loading from "../components/UI/Loading";

const RecentExpenses = () => {
  const [loading, setLoading] = useState(true);
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    const getAsyncExpenses = async () => {
      setLoading(true);
      const expensesData = await getExpenses();
      setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

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
