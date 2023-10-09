import React, {useCallback, useState, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createTable, deleteExpense, getDBConnection, getExpenses } from '../services/db-service';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExpenseList = (props) => {
  const [expenses, setExpenses] = useState([])

  const onDelete = async (expense) => {
    const expensesList = expenses.filter( item => item.id !== expense.id)
    console.log(expense.id)
    try {
      const db = await getDBConnection()
      const result = await deleteExpense(db, expense.id)
      console.log(result)
      setExpenses(expensesList)
    } catch(error) {
      console.log(error)
    }
  }

  const loadExpensesCallback = async () => {
      // console.warn('effect')
      try {
        const db = await getDBConnection();
        await createTable(db);
        const expenses = await getExpenses(db);
        setExpenses(expenses)
      } catch (error) {
        console.error(error)
      }
    }

  useEffect(() => {
    loadExpensesCallback()
  }, [])
  
  
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name='food' size={20} style={styles.icon} color={'#13561D'}/>
            <Text style={styles.expenseTitle}>{item.description}</Text>
            <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => onDelete(item)}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 5,
  },
  expenseTitle: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    color: '#353535'
  },
  expenseAmount: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 16,
    color: '#06320D',
  },
  icon: {
    backgroundColor: '#D7F4DB',
    borderRadius: 100,
    padding: 8,
  }
});

export default ExpenseList;