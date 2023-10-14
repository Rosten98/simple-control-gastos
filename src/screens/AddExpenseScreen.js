import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AmountInput from '../components/AmountInput';
import ButtonPrimary from '../components/ButtonPrimary';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { addExpenese, createTable, getDBConnection } from '../services/db-service';

const AddExpenseScreen = (props) => {
  const [amount, setAmount] = useState('0.0');
  const [isAmountValid, setIsAmountValid] = useState(true)
  const [description, setDescription] = useState('');
  // Dropdown picker - Categories
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([
    // {label: 'Comida', value: 'comida', icon: 'food'},
    // {label: 'Transporte', value: 'transporte', icon: 'taxi'}
    {label: 'Comida', value: 'comida', icon: ()=> <MaterialCommunityIcons name='food' size={20}/>},
    {label: 'Transporte', value: 'transporte', icon: ()=> <MaterialCommunityIcons name='taxi' size={20}/>},
  ])
  // Date picker
  const [date, setDate] = useState(new Date())
  const [openDP, setOpenDP] = useState(false)

  const descriptionChangedHandler = (text) => {
    setDescription(text);
  }

  const addExpenseHandler = () => {
    const expense = {
      id: uuidv4(),
      description: description,
      amount: amount,
      date: new Date().toISOString(),
      category: category
    };
    console.log(expense)
    onAddExpense(expense)
    setDescription('');
    setAmount('0.0');
    setCategory(null)
    setDate(new Date())
  }

  const onAddExpense = async (expense)=> {
    try {
      const db = await getDBConnection();
      const result = await addExpenese(db, expense)
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <View style={styles.form}>
      <AmountInput styles={styles} amount={amount} setAmount={setAmount} isAmountValid={isAmountValid} setIsAmountValid={setIsAmountValid}/>
      <View style={styles.formControl}>
        <Text style={styles.label}>Descripción: </Text>
        <TextInput
          placeholder='Cena en restaurante...'
          style={styles.input}
          onChangeText={descriptionChangedHandler}
          value={description}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Categoría: </Text>
        <DropDownPicker
          placeholder='Elige una categoría'
          placeholderStyle={{color:'#888'}}
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          style={styles.input}
          textStyle={{fontFamily: 'WorkSans-Regular'}}
          dropDownContainerStyle={{borderColor: '#cdcdcd'}}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Fecha: </Text>
        <TouchableOpacity style={styles.input} onPress={() => setOpenDP(true)}>
          <Text>{new Date(date).toDateString()}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openDP}
          date={date}
          mode='date'
          onConfirm={(date) => {
            setOpenDP(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpenDP(false)
          }}
        />
      </View>
      <View style={styles.button}>
        <ButtonPrimary text='Agregar gasto' onPressHandler={addExpenseHandler}/>
        {/* <Button title="TEst"></Button> */}
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
    fontFamily: 'WorkSans-Bold',
    color: '#888'
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