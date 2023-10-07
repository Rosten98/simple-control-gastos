import React, { useState } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'

const AmountInput = ({ styles, setAmount, amount, isAmountValid, setIsAmountValid }) => {
  
  const amountChangedHandler = (text) => {
    const amount = text.substring(1)
    setAmount(amount);
  };

  const validateFormat = () => {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    const isValid = regex.test(amount);
    setIsAmountValid(isValid)
  }

  return (
    <View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Costo: </Text>
        <TextInput
          style={styles.input}
          onChangeText={amountChangedHandler}
          onEndEditing={validateFormat}
          value={'$' + amount}
          keyboardType="numeric"
        />
      </View>
      {
        !isAmountValid && 
        <View style={styles_.warningContainer}>
          <Text style={styles_.wariningText}>El formato no es válido. Sólo números y un punto decimal son permitidos. Ejemplo: 129.90</Text>
        </View>
      }
      </View>
      
  )
}

const styles_ = StyleSheet.create({
  warningContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  wariningText: {
    fontSize: 12,
    fontFamily: 'WorkSans-Regular'
  }
})

export default AmountInput