import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AddExpenseScreen from './screens/AddExpenseScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListExpensesScreen from './screens/ListExpensesScreen';
import HomeScreen from './screens/HomeScreen';

const ExpenseTracker = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          tabBarShowLabel: false,
          tabBarStyle: { borderTopLeftRadius: 20, borderTopRightRadius: 20}
        }}>
        <Tab.Screen 
          name="Inicio" 
          component={HomeScreen} 
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={ focused ? '#13561D': '#C1C1C1'} size={size} />
            ),
          }}/>
        <Tab.Screen
          name="Gastos"
          component={ListExpensesScreen}
          options={{
            tabBarLabel: 'Gastos',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="view-agenda-outline" color={ focused ? '#13561D': '#C1C1C1'} size={size} />
            ),
          }}/>  
        <Tab.Screen 
          name="Agregar gasto" 
          component={AddExpenseScreen} 
          options={{
            tabBarLabel: 'Agregar',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="plus-circle-outline" color={ focused ? '#13561D': '#C1C1C1'} size={size} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'WorkSans-SemiBold', 
    color: '#353535',
    fontSize: 20,
    marginLeft: 5,
    marginTop: 20,
  },
  header: {
    shadowColor: 'white',
    height: 70
  }
})

export default ExpenseTracker