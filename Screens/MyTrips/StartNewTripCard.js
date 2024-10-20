import { View,Text, TouchableOpacity } from "react-native";
import React, {useState} from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";


export default function StartNewTripCard(){
    const navigation=useNavigation();
    return(
        <View style={{padding:20,marginTop:50,display:'flex',alignItems:'center',gap:25,backgroundColor:'white'}}>
            <Entypo name="location-pin" size={35} color="black" />
            <Text style={{fontSize:25,fontWeight:'500'}}>No Trips Planned Yet</Text>
            <Text style={{fontSize:20,textAlign:'center',color:'grey'}}>Time to plan a new travel experience! Get started below.</Text>
            <TouchableOpacity 
            onPress={()=>navigation.navigate("SearchPlace")}
            style={{padding:10,backgroundColor:'black',borderRadius:15,paddingHorizontal:15}}
            >
            <Text style={{color:'white',fontWeight:600,fontSize:17}}>Start a new trip</Text>
            </TouchableOpacity>
        </View>
    )
}