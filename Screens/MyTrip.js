import React, {useState} from 'react';
import {Text,View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from './MyTrips/StartNewTripCard';

export default function MyTrip({navigation}){

    const [userTrips,setUserTrips]= useState([]);

    return(
        <View style={{padding:25,paddingTop:55,backgroundColor:'white',height:'100%'}}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontWeight:'bold',fontSize:35}}>My Trip</Text>
                <Ionicons name="add-circle" size={40} color="black" />
            </View>

            {userTrips?.length==0?
            <StartNewTripCard/>
            :
            null
            }
        </View>
    )
}