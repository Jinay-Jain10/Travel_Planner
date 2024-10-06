import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './Screens/Landing'

const stack=createStackNavigator()

function StackNavigator(){
  return(
    <stack.Navigator
    initialRouteName='Landing' 
    screenOptions={{
    headerTintColor:"black",
    headerTitleAlign:"center",
    headerTitleStyle:{fontWeight:"bold"},
   }}>

   <stack.Screen name="Travel App" component={Landing} options={{headerShown:false}}/>
  </stack.Navigator>
  )
}


const App=()=>{
  return(
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  )
}

export default App;