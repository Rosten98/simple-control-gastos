import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const ButtonPrimary = ({text, onPressHandler}) => {
  return (
    <Pressable 
      style={({pressed})=>[
        pressed ?  styles.buttonPressed : styles.buttonUnPressed, styles.button
      ]}
      onPress={onPressHandler}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 18,
    borderRadius: 5
  },
  buttonPressed: {backgroundColor: 'rgba(19,86,29,.81)'},
  buttonUnPressed: {backgroundColor: '#13561D'},
  text: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
})

export default ButtonPrimary