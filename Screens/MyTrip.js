import React, { useState,useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "./MyTrips/StartNewTripCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../Configs/FireBaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import UserTripList from "./MyTrips/UserTripList";
import { tr } from "date-fns/locale";
import { ScrollView } from "react-native-gesture-handler";



export default function MyTrip() {
    const navigation = useNavigation();

  const [tripDataUser, setTripDataUser] = useState([]);
  const [loading, setLoading]=useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(()=>{
    user && GetMyTrips();
  },[user])

  const GetMyTrips = async() => {
    setLoading(true);
    setTripDataUser([]);
    const q = query(collection(db, "TripDataUser"), where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setTripDataUser(prev=>[...prev,doc.data()])
    });
    setLoading(false);
  }

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 55,
        paddingBottom:55,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 35 }}>My Trip</Text>
        <TouchableOpacity 
        style={{height:70,padding:15}}
        onPress={()=>navigation.navigate("SearchPlace")}>
        <Ionicons name="add-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size={'large'} color={'black'}/>}


      {tripDataUser?.length == 0 ? <StartNewTripCard /> : <UserTripList tripDataUser={tripDataUser}/>}
    </ScrollView>
  );
}
