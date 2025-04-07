import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Entypo } from "@expo/vector-icons";

import Landing from './Screens/Landing';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import MyTrip from './Screens/MyTrip';
import Discover from './Screens/Discover';
import Profile from './Screens/Profile';
import SearchPlace from './Screens/CreateTrip/SearchPlace';
import StartNewTripCard from './Screens/MyTrips/StartNewTripCard';
import SelectTraveller from './Screens/CreateTrip/SelectTraveller';
import SelectDate from './Screens/CreateTrip/SelectDate';
import SelectBudget from './Screens/CreateTrip/SelectBudget';
import ReviewTrip from './Screens/CreateTrip/ReviewTrip';
import GenerateTrip from './Screens/CreateTrip/GenerateTrip';
import { CreateTripContext } from './Screens/Context/CreateTripContext';
import { auth } from './Configs/FireBaseConfig';  
import TripDetails from './Screens/TripDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Landing'
      screenOptions={{
        headerTintColor: "black",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="MyTrip" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ headerShown: false }} />
      <Stack.Screen name="StartNewTripCard" component={StartNewTripCard} options={{ headerShown: false }} />
      <Stack.Screen name="SelectTraveller" component={SelectTraveller} options={{ headerShown: false }} />
      <Stack.Screen name="SelectDate" component={SelectDate} />
      <Stack.Screen name="SelectBudget" component={SelectBudget} />
      <Stack.Screen name="ReviewTrip" component={ReviewTrip} />
      <Stack.Screen name="GenerateTrip" component={GenerateTrip} />
      <Stack.Screen name="TripDetails" component={TripDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name='My Trip'
        component={MyTrip}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo name="location" size={27} color={focused ? "#111" : "grey"} />
              </View>
            );
          }
        }}
      />
      <Tab.Screen
        name='Discover'
        component={Discover}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo name="globe" size={27} color={focused ? "#111" : "grey"} />
              </View>
            );
          }
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo name="user" size={27} color={focused ? "#111" : "grey"} />
              </View>
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const user = auth.currentUser;
  const [tripData, setTripData] = useState([]);

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <GestureHandlerRootView style={{ flex: 1 }}> 
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </CreateTripContext.Provider>
  );
};

export default App;
