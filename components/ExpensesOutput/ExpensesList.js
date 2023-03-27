import { StyleSheet, FlatList, Text } from "react-native";
import React from "react";

const renderExpenseItem = ({ item }) => {
  return <Text>{item.description}</Text>;
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
