import moment from "moment/moment";
import React, { useState,useEffect } from "react";
import { ActivityIndicator, Text, View,Image, TouchableOpacity, ScrollView } from "react-native";
const API_KEY= '-';  
export default function UserTripList({tripDataUser}){
    const formatData=(data)=>{
        return JSON.parse(data);
    }
    // const image= (tripDataUser[0].tripPlan.travelPlan.dailyPlan.activities.placeImageURL)
    const LatestTrip=JSON.parse(tripDataUser[0].tripData)
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop:20}}>
        {LatestTrip?.locationInfo.url?
        <Image style={{height:240,width:'100%'}} source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=ATJ83zhSSAtkh5LTozXMhBghqubeOxnZWUV2m7Hv2tQaIzKQJgvZk9yCaEjBW0r0Zx1oJ9RF1G7oeM34sQQMOv8s2zA0sgGBiyBgvdyMxeVByRgHUXmv-rkJ2wyvNv17jyTSySm_-_6R2B0v4eKX257HOxvXlx_TSwp2NrICKrZM2d5d2P4q&key=${API_KEY}`}}/>
        :
            <Image source={require('./../../assets/landingimage.jpg')}
                style={{width:'100%', height:240,objectFit:'cover',borderRadius:15}}
            />
        }
            <View style={{marginTop:10}}>
                <Text style={{fontSize:20,fontWeight:600}}>{tripDataUser[0].tripPlan?.travelPlan.location}</Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:15,fontWeight:400}}>{moment(LatestTrip.startDate).format('DD MMM yyyy')} </Text>
                <Text style={{fontSize:15,fontWeight:400}}>🚂 {LatestTrip.travellerCount.title}</Text>
                </View>

                <TouchableOpacity style={{backgroundColor:'black',padding:15,borderRadius:15,marginTop:10}}>
                    <Text style={{color:'white',textAlign:'center',fontSize:15}}>See your plan</Text>
                </TouchableOpacity>
            </View>

            {tripDataUser.map((trip,index)=>
            <View style={{marginTop:15, display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}>
                <View style={{marginTop:10}}>
                    <Image
                    style={{width:100,height:100,borderRadius:15}}
                     source={require('./../../assets/landingimage.jpg')}/>
                </View>
                <View>
                    <Text style={{fontSize:17,fontWeight:600}}>{trip.tripPlan?.travelPlan?.location}</Text>
                    <Text>{moment(formatData(trip.tripData).startDate).format('DD MMM yyyy')}</Text>
                    <Text>Travelling: {formatData(trip.tripData).travellerCount.title}</Text>
                </View>
            </View>
            )}
        </View>
        </ScrollView>
    )
}