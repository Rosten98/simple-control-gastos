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
      await deleteExpense(db, expense.id)
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
              <MaterialCommunityIcons name='delete' size={16}/>
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 10,
  },
  expenseTitle: {
    flex: 3,
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    color: '#353535'
  },
  expenseAmount: {
    flex: 1, 
    fontFamily: 'WorkSans-Bold',
    fontSize: 16,
    color: '#06320D',
  },
  icon: {
    backgroundColor: '#D7F4DB',
    borderRadius: 100,
    padding: 8,
    marginRight: 10,
  }
});

export default ExpenseList;