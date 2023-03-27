import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ description, date, amount }) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate("ManageExpense");
  };
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={handleItemPress}
    >
      <View style={styles.expenseItemContainer}>
        <View>
          <Text style={[styles.textBase, styles.descriptionText]}>
            {description}
          </Text>
          <Text style={styles.textBase}>
            {date.toLocaleDateString("pt-BR").replaceAll("/", "-")}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amountText]}>
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    shadowColor: GlobalStyles.colors.primary800,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
    fontFamily: "dm-sans",
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: "dm-sans-bold",
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.primary25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amountText: {
    color: GlobalStyles.colors.primary700,
    fontFamily: "dm-sans-bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
