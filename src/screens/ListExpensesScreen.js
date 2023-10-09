import React, {useCallback, useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { createTable, getDBConnection, getExpenses } from '../services/db-service';

const ExpenseList = (props) => {
  const [expenses, setExpenses] = useState([])

  const loadExpensesCallback = 
    async () => {
      try {
        const db = await getDBConnection();
        // console.log(db)
        await createTable(db);
        const expenses = await getExpenses(db);
        console.log(expenses)
      } catch (error) {
        console.error(error)
      }
    }

  useEffect(() => {
    loadExpensesCallback()
  }, [])
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense List</Text>
      <FlatList
        data={props.expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  expenseTitle: {
    fontSize: 18,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExpenseList;