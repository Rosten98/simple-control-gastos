import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
} from 'react-native';

const AddExpenseScreen = (props) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const titleChangedHandler = (text) => {
    setTitle(text);
  };

  const amountChangedHandler = (text) => {
    setAmount(text);
  };

  const addExpenseHandler = () => {
    const expense = {
      title: title,
      amount: +amount,
      date: new Date().toISOString(),
    };
    setTitle('');
    setAmount('');
    props.onAddExpense(expense);
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangedHandler}
          value={title}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          onChangeText={amountChangedHandler}
          value={amount}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.button}>
        <Button title="Add Expense" onPress={addExpenseHandler} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 20,
  },
});

export default AddExpenseScreen;