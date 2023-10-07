import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddExpenseScreen = (props) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  // Dropdown picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    // {label: 'Comida', value: 'comida', icon: 'food'},
    // {label: 'Transporte', value: 'transporte', icon: 'taxi'}
    {label: 'Comida', value: 'comida', icon: ()=> <MaterialCommunityIcons name='food' size={20}/>},
    {label: 'Transporte', value: 'transporte', icon: ()=> <MaterialCommunityIcons name='taxi' size={20}/>}
  ]);

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
    <View style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Costo: </Text>
        <TextInput
          style={styles.input}
          onChangeText={amountChangedHandler}
          value={amount}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Descripción: </Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangedHandler}
          value={title}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Categoría: </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.input}
        />
      </View>
      <View style={styles.button}>
        <Button title="Add Expense" onPress={addExpenseHandler}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: 'white',
    height: '100%'
  },
  formControl: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    marginVertical: 8,
    fontFamily: 'WorkSans-Regular',
  },
  input: {
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#CDCDCD',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default AddExpenseScreen;