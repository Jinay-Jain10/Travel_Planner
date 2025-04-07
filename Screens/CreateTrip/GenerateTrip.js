import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { CreateTripContext } from "../Context/CreateTripContext";
import { AI_PROMPT } from "../Constants/Option";
import { chatSession } from "../../Configs/AIModel";
import { auth, db } from "../../Configs/FireBaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function GenerateTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
     tripData && GenerateAITrip();
  }, []);

  const GenerateAITrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData.locationInfo.name
    )
      .replace("{totalDays}", tripData.totalNoOfDays)
      .replace("{totalNight}", tripData.totalNoOfDays - 1)
      .replace("{traveller}", tripData.travellerCount.title)
      .replace("{budget}", tripData.budget)
      .replace("{totalDays}", tripData.totalNoOfDays)
      .replace("{totalNight}", tripData.totalNoOfDays - 1);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp = JSON.parse(result.response.text());
    setLoading(false);

    const docID = Date.now().toString();
    // const result_ = await setDoc(doc(db,"UserTrips",docID),{
    //     userEmail: user.email,
    //     tripData: tripResp
    // })

    const result_ = await setDoc(doc(db, "TripDataUser", docID), {
      userEmail: user.email,
      tripPlan: tripResp, // result from gemini
      tripData: JSON.stringify(tripData), // data selected by user
      docID: docID,
    });

      navigation.navigate("MyTrip");
    
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 35, textAlign: "center" }}>
        Please wait...
      </Text>
      <Text
        style={{
          fontWeight: 500,
          fontSize: 25,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        We are working on your dream trip.
      </Text>
      <Image
        source={require("./../../assets/loading.webp")}
        style={{
          width: "100%",
          height: 200,
          objectFit: "contain",
          marginTop: 20,
        }}
      />
      <Text
        style={{
          fontWeight: 400,
          fontSize: 20,
          textAlign: "center",
          color: "grey",
          marginTop: 20,
        }}
      >
        Do not exit this page
      </Text>
    </View>
  );
}
