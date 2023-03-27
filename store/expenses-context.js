import { createContext, useReducer } from "react";

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
  {
    id: "e6",
    description: "Angra Concert",
    amount: 15.99,
    date: new Date("2023-03-24"),
  },
  {
    id: "e7",
    description: "Desk Chair",
    amount: 149.99,
    date: new Date("2023-03-26"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatableItem = {
        ...updatableExpense,
        ...action.payload.expenseData,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatableItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => state.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "ADD", payload: { id, expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
