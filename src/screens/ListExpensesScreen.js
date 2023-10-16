import React, {useCallback, useState, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createTable, deleteExpense, getDBConnection, getExpenses } from '../services/db-service';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExpenseList = (props) => {
  const [expenses, setExpenses] = useState([])
  const [refreshing, setRefreshing] = useState(false)

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

  const onListRefresh = () => {
    setRefreshing(true)
    loadExpensesCallback()
    setRefreshing(false)
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
        onRefresh={onListRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name='food-outline' size={16} style={styles.icon} color={'#13561D'}/>
            <Text style={styles.expenseTitle}>{item.description}</Text>
            <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => onDelete(item)}>
              <MaterialCommunityIcons name='delete' size={14}/>
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
    padding: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    marginBottom: 5,
    paddingVertical: 15,
    borderRadius: 10,
    // Shadow - Android
    backgroundColor: '#fff',
    shadowColor: '#999',
    elevation: 3,
    //Shadow - iOS
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  expenseTitle: {
    flex: 4,
    fontFamily: 'WorkSans-Regular',
    fontSize: 15,
    color: '#353535',
    marginRight: 0,
  },
  expenseAmount: {
    flex: 2, 
    fontFamily: 'WorkSans-SemiBold',
    color: '#06320D',
    textAlign: 'right'
  },
  icon: {
    backgroundColor: '#D7F4DB',
    borderRadius: 100,
    padding: 8,
    marginRight: 10,
  }
});

export default ExpenseList;