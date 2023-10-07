/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ExpenseForm from './src/ExpenseTracker';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      <StatusBar/>
      <ExpenseForm/>
    </SafeAreaView>
  );
}

export default App;
