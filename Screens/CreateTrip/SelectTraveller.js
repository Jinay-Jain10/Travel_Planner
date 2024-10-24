import React, { useEffect, useState ,useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { CreateTripContext } from "../Context/CreateTripContext";
 

export default function SelectTraveller() {
  const navigation = useNavigation();

  const [selectedTraveller, setSelectedTraveller] = useState();
  const {tripData,setTripData}=useContext(CreateTripContext);

  const OptionList = [
    {
      id: 1,
      title: "Just Me",
      desc: "A solo travellers exploration",
      icon: "✈",
      people: "1 Person",
    },
    {
      id: 2,
      title: "Couple",
      desc: "Two travellers in tandem",
      icon: "♥",
      people: "2 People",
    },
    {
      id: 3,
      title: "Family",
      desc: "A Family loving adventures",
      icon: "🏡",
      people: "3 to 6 People",
    },
    {
      id: 4,
      title: "Friends",
      desc: "A bunch of thrill-seekers",
      icon: "⛰️",
      people: "5 to 10 People",
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Who's Travelling",
    });
  }, []);

  useEffect(()=>{ 
    setTripData({...tripData,
      travellerCount:selectedTraveller
    })
  },[selectedTraveller])

  useEffect(()=>{
    console.log(tripData)
  },[tripData])

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Text style={{ fontSize: 25, marginTop: 20, fontWeight: "bold" }}></Text>

      <View style={{ alignContent: "center" }}>
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>
          Choose your companions
        </Text>

        <FlatList
          data={OptionList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveller(item)}
              style={{ marginVertical: 10 }}
            >
              <View
                style={[{
                  padding: 25,
                  display: "flex",
                  borderRadius: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#d3d3d3",
                },selectedTraveller?.id==item?.id&&{borderWidth:3}]}
              >
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 17, color: "grey" }}>
                    {item.desc}
                  </Text>
                </View>

                <Text style={{ fontSize: 30 }}>{item.icon}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity 
      onPress={()=>navigation.navigate("SelectDate")}
      style={{padding:15,backgroundColor:'black',borderRadius:15,marginTop:20}}
      >
        <Text style={{textAlign:'center',color:'white'}}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
