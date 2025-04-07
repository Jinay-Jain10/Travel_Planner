import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CreateTripContext } from "../Context/CreateTripContext";

export default function SelectBudget() {
    const navigation = useNavigation();
    const [selectedBudget, setSelectedBudget] = useState(null);
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
        if (selectedBudget) {
            setTripData({
                ...tripData,
                budget: selectedBudget?.title,
            });
        }
    }, [selectedBudget]);

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
        <View style={styles.container}>
            <Text style={styles.heading}>Budget</Text>

            <View style={styles.subHeadingContainer}>
                <Text style={styles.subHeading}>Choose spending habits for your trip</Text>
            </View>

            <FlatList
                data={OptionList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedBudget(item)}
                        style={styles.optionContainer}
                    >
                        <View
                            style={[
                                styles.optionItem,
                                selectedBudget?.id === item?.id && styles.selectedOption,
                            ]}
                        >
                            <View>
                                <Text style={styles.optionTitle}>{item.title}</Text>
                                <Text style={styles.optionDesc}>{item.desc}</Text>
                            </View>
                            <Text style={styles.optionIcon}>{item.icon}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />

            <TouchableOpacity onPress={onClickContinue} style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 85,
        padding: 25,
    },
    heading: {
        fontWeight: "bold",
        fontSize: 35,
        marginTop: 20,
    },
    subHeadingContainer: {
        marginTop: 20,
        paddingLeft: 5,
    },
    subHeading: {
        fontSize: 17,
        fontWeight: "800",
    },
    optionContainer: {
        marginVertical: 10,
    },
    optionItem: {
        padding: 25,
        display: "flex",
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#d3d3d3",
    },
    selectedOption: {
        borderWidth: 3,
        borderColor: "black",
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    optionDesc: {
        fontSize: 14,
    },
    optionIcon: {
        fontSize: 35,
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
    },
});
