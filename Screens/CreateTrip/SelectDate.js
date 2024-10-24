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
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

export default function SelectDate() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const onDateChange = (date, type) => {
    console.log(date, type);
    if (type == "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionContinue = () => {
    if (!startDate && !endDate) {
      ToastAndroid.show("Please select start and end dates", ToastAndroid.LONG);
      return;
    }
    const totalNoOfDays = endDate.diff(startDate, "days");
    console.log(totalNoOfDays + 1);
    setTripData({
      ...tripData,
      startDate: startDate,
      endDate: endDate,
      totalNoOfDays: totalNoOfDays + 1,
    });

    navigation.navigate("SelectBudget");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 35, marginTop: 20 }}>
        Travel Dates
      </Text>

      <View style={{ marginTop: 30 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{ backgroundColor: "black" }}
          selectedDayTextStyle={{ color: "white" }}
        />
      </View>

      <TouchableOpacity
        onPress={onDateSelectionContinue}
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
