import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ExpenseList = (props) => {
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