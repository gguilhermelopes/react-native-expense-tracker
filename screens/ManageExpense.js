import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.id;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>ManageExpense</Text>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({});
