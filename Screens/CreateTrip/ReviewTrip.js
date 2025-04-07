import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { CreateTripContext } from "../Context/CreateTripContext";
import Entypo from "@expo/vector-icons/Entypo";
import moment from "moment";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "white",
        height: "100%",
        paddingLeft: 25,
      }}
    >
      <Text style={{ fontSize: 35, fontWeight: "bold", paddingTop: 10 }}>
        Review your Trip
      </Text>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Before generating your trip, please review your selection.
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          marginLeft: 10,
        }}
      >
        <Text style={{ fontSize: 35 }}>📍</Text>
        <View>
          <Text style={{ fontWeight: 400, fontSize: 17, color: "grey" }}>
            Destination:
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 19 }}>
            {tripData.locationInfo.name}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          marginLeft: 10,
        }}
      >
        <Text style={{ fontSize: 35 }}>🗓</Text>
        <View>
          <Text style={{ fontWeight: 400, fontSize: 17, color: "grey" }}>
            Travel Date:
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 19 }}>
            {moment(tripData?.startDate).format("DD MMM") +
              " To " +
              moment(tripData?.endDate).format("DD MMM ")}{" "}
            ({tripData.totalNoOfDays + " Days"})
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          marginLeft: 10,
        }}
      >
        <Text style={{ fontSize: 35 }}>🚂</Text>
        <View>
          <Text style={{ fontWeight: 400, fontSize: 17, color: "grey" }}>
            Who is Travelling:
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 19 }}>
            {tripData.travellerCount.title}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          marginLeft: 10,
        }}
      >
        <Text style={{ fontSize: 35 }}>💰</Text>
        <View>
          <Text style={{ fontWeight: 400, fontSize: 17, color: "grey" }}>
            Budget:
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 19 }}>
            {tripData.budget}
          </Text>
        </View>
      </View>

      <TouchableOpacity
      onPress={()=>navigation.navigate("GenerateTrip")}
        style={{
          padding: 15,
          backgroundColor: "black",
          borderRadius: 15,
          marginTop: 60,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 17 }}>
          Build my trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
