import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";


const API_KEY = 'AIzaSyDDlanSvK0Nz4kRPbDzONMgpLdhWIgvvzM';  

export default function UserTripList({ tripDataUser }) {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);

    const formatData = (data) => {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error("Error parsing trip data:", error);
            return {};
        }
    };

    // Ensure tripDataUser is not empty
    if (!tripDataUser || tripDataUser.length === 0) {
        return <Text>No trip data available</Text>;
    }

    // Parse latest trip data
    const LatestTrip = formatData(tripDataUser[0]?.tripData);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20,marginBottom:65 }}>
                {LatestTrip?.locationInfo?.url ? (
                    <Image
                        style={{ height: 240, width: '100%' }}
                        source={{
                            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=`+LatestTrip.locationInfo?.url+`&key=${API_KEY}`
                        }}
                    />
                ) : (
                    <Image
                        source={require('./../../assets/landingimage.jpg')} 
                        style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 15 }}
                    />
                )}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 600 }}>
                        {tripDataUser[0]?.tripPlan?.travelPlan?.location || "Unknown Location"}
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15, fontWeight: 400 }}>
                            {moment(LatestTrip?.startDate).format('DD MMM yyyy')}
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: 400 }}>
                            🚂 {LatestTrip?.travellerCount?.title || "Unknown"}
                        </Text>
                    </View>

                    <TouchableOpacity 
                    onPress={()=>
                    navigation.navigate("TripDetails")}
                    style={{ backgroundColor: 'black', padding: 15, borderRadius: 15, marginTop: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>
                            See your plan
                        </Text>
                    </TouchableOpacity>
                </View>

                {tripDataUser.map((trip, index) => (
                    <View key={index} style={{ marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <View style={{ marginTop: 10 }}>
                            <Image
                                style={{ width: 100, height: 100, borderRadius: 15 }}
                                source={require('./../../assets/landingimage.jpg')}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: 600 }}>
                                {trip?.tripPlan?.travelPlan?.location || "Unknown Location"}
                            </Text>
                            <Text>
                                {moment(formatData(trip?.tripData)?.startDate).format('DD MMM yyyy')}
                            </Text>
                            <Text>
                                Travelling: {formatData(trip?.tripData)?.travellerCount?.title || "Unknown"}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
