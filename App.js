import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './Screens/Landing'
import Login from './Screens/Login'
import Signup from './Screens/Signup';
import MyTrip from './Screens/MyTrip';
import Discover from './Screens/Discover';
import Profile from './Screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Entypo} from "@expo/vector-icons";


import { auth } from './Configs/FireBaseConfig';
import SearchPlace from './Screens/CreateTrip/SearchPlace';
import StartNewTripCard from './Screens/MyTrips/StartNewTripCard';
import { CreateTripContext } from './Screens/Context/CreateTripContext';
import SelectTraveller from './Screens/CreateTrip/SelectTraveller';
import SelectDate from './Screens/CreateTrip/SelectDate';
import SelectBudget from './Screens/CreateTrip/SelectBudget';
import ReviewTrip from './Screens/CreateTrip/ReviewTrip';
import GenerateTrip from './Screens/CreateTrip/GenerateTrip';

const stack=createStackNavigator()
const Tab=createBottomTabNavigator()




function StackNavigator(){
  return(
    <stack.Navigator
    initialRouteName='Landing' 
    screenOptions={{
    headerTintColor:"black",
    headerTitleAlign:"center",
    headerTitleStyle:{fontWeight:"bold"},
   }}>

   <stack.Screen name="Landing" component={Landing} options={{headerShown:false}}/>
   <stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
   <stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
   <stack.Screen name="MyTrip" component={TabNavigator} options={{headerShown:false}}/>
   <stack.Screen name="SearchPlace" component={SearchPlace} options={{headerShown:false}}/>
   <stack.Screen name="StartNewTripCard" component={StartNewTripCard} options={{headerShown:false}}/>
   <stack.Screen name="SelectTraveller" component={SelectTraveller} options={{headerShown:false}}/>
   <stack.Screen name="SelectDate" component={SelectDate} />
   <stack.Screen name="SelectBudget" component={SelectBudget}/>
   <stack.Screen name="ReviewTrip" component={ReviewTrip}/>
   <stack.Screen name="GenerateTrip" component={GenerateTrip}/>

  </stack.Navigator>
  )
}

function TabNavigator(){
  return(
    <Tab.Navigator  screenOptions={{headerShown:false}}>
      <Tab.Screen 
      name='My Trip' 
      component={MyTrip}
      options={{
        tabBarIcon:({focused})=>{
          return(
            <View style={{alignItems:"center", justifyContent:"center"}}>
              <Entypo name="location" size={27} color={focused ? "#111":"grey"}/>
            </View>
          )
        }
      }}
      />
      <Tab.Screen 
      name='Discover' 
      component={Discover}
      options={{
        tabBarIcon:({focused})=>{
          return(
            <View style={{alignItems:"center", justifyContent:"center"}}>
              <Entypo name="globe" size={27} color={focused ? "#111":"grey"}/>
            </View>
          )
        }
      }}
      />
      <Tab.Screen 
      name='Profile' 
      component={Profile}
      options={{
        tabBarIcon:({focused})=>{
          return(
            <View style={{alignItems:"center", justifyContent:"center"}}>
              <Entypo name="user" size={27} color={focused ? "#111":"grey"}/>
            </View>
          )
        }
      }}
      />
    </Tab.Navigator>
    )
}


const App=()=>{

  const user =auth.currentUser;
  const [tripData,setTripData]=useState([]);
  return(
    <CreateTripContext.Provider value={{tripData,setTripData}}>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </CreateTripContext.Provider>
  )
}

export default App;