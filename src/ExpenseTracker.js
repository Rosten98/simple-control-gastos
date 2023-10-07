import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListExpensesScreen from './src/screens/ListExpensesScreen';

const ExpenseTracker = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Inicio" 
          component={AddExpenseScreen} 
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}/>
          <Tab.Screen
            name="Gastos"
            component={ListExpensesScreen}
            options={{
              tabBarLabel: 'Gastos',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="view-list" color={color} size={size} />
              ),
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default ExpenseTracker