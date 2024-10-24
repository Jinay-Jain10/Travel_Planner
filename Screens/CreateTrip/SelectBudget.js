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

export default function SelectBudget() {
  const navigation = useNavigation();
  const [selectedBudget, setSelectedBudget] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const onClickContinue = () => {
    if (!selectedBudget) {
      ToastAndroid.show("Please select your budget", ToastAndroid.LONG);
      return;
    } else {
      navigation.navigate("ReviewTrip");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    selectedBudget &&
      setTripData({
        ...tripData,
        budget: selectedBudget?.title,
      });
  }, [selectedBudget]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const OptionList = [
    {
      id: 1,
      title: "Cheap",
      desc: "Stay conscious of costs",
      icon: "💵",
    },
    {
      id: 2,
      title: "Moderate",
      desc: "Keep cost on the average end",
      icon: "💰",
    },
    {
      id: 3,
      title: "Luxurious",
      desc: "Don't worry about costs",
      icon: "💸",
    },
  ];

  return (
    <View style={{ paddingTop: 85, padding: 25 }}>
      <Text style={{ fontWeight: "bold", fontSize: 35, maginTop: 20 }}>
        {" "}
        Budget
      </Text>

      <View style={{ marginTop: 20, paddingLeft: 5 }}>
        <Text style={{ fontSize: 17, fontWeight: 800 }}>
          Choose spending habits for your trip
        </Text>
      </View>

      <FlatList
        data={OptionList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedBudget(item)}
            style={{ marginVertical: 10 }}
          >
            <View
              style={[
                {
                  padding: 25,
                  display: "flex",
                  borderRadius: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#d3d3d3",
                },
                selectedBudget?.id == item?.id && { borderWidth: 3 },
              ]}
            >
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 17, color: "grey" }}>{item.desc}</Text>
              </View>

              <Text style={{ fontSize: 30 }}>{item.icon}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => onClickContinue()}
        style={{
          padding: 15,
          backgroundColor: "black",
          borderRadius: 15,
          marginTop: 30,
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
