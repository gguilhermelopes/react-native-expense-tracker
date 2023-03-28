import { StyleSheet, View, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (expenses.length) content = <ExpensesList expenses={expenses} />;
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      {content}
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
  infoText: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    fontFamily: "dm-sans-bold",
    textAlign: "center",
    marginTop: 24,
    maxWidth: "70%",
    alignSelf: "center",
  },
});
