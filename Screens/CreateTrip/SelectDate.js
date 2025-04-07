import moment from "moment/moment";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CreateTripContext } from "../Context/CreateTripContext";

export default function SelectDate() {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isStartPickerVisible, setStartPickerVisible] = useState(false);
    const [isEndPickerVisible, setEndPickerVisible] = useState(false);
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);

    const showStartPicker = () => setStartPickerVisible(true);
    const hideStartPicker = () => setStartPickerVisible(false);

    const showEndPicker = () => setEndPickerVisible(true);
    const hideEndPicker = () => setEndPickerVisible(false);

    const handleConfirmStartDate = (date) => {
        setStartDate(moment(date));
        hideStartPicker();
    };

    const handleConfirmEndDate = (date) => {
        if (startDate && moment(date).isBefore(startDate)) {
            ToastAndroid.show("End date cannot be before start date", ToastAndroid.LONG);
        } else {
            setEndDate(moment(date));
        }
        hideEndPicker();
    };

    const onDateSelectionContinue = () => {
        if (!startDate || !endDate) {
            ToastAndroid.show("Please select start and end dates", ToastAndroid.LONG);
            return;
        }

        const totalNoOfDays = endDate.diff(startDate, "days") + 1;

        setTripData({
            ...tripData,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
            totalNoOfDays: totalNoOfDays,
        });

        navigation.navigate("SelectBudget");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Travel Dates</Text>

            <TouchableOpacity onPress={showStartPicker} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>
                    {startDate ? startDate.format("DD MMM YYYY") : "Select Start Date"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={showEndPicker} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>
                    {endDate ? endDate.format("DD MMM YYYY") : "Select End Date"}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isStartPickerVisible}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handleConfirmStartDate}
                onCancel={hideStartPicker}
            />

            <DateTimePickerModal
                isVisible={isEndPickerVisible}
                mode="date"
                minimumDate={startDate ? startDate.toDate() : new Date()}
                onConfirm={handleConfirmEndDate}
                onCancel={hideEndPicker}
            />

            <TouchableOpacity onPress={onDateSelectionContinue} style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 75,
        backgroundColor: "white",
        height: "100%",
    },
    title: {
        fontWeight: "bold",
        fontSize: 35,
        marginTop: 20,
    },
    dateButton: {
        padding: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        alignItems: "center",
    },
    dateButtonText: {
        fontSize: 18,
    },
    continueButton: {
        padding: 15,
        backgroundColor: "black",
        borderRadius: 15,
        marginTop: 30,
    },
    continueButtonText: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
    },
});

