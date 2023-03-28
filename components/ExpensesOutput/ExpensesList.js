import { StyleSheet, FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = ({ item }) => {
  return <ExpenseItem {...item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
