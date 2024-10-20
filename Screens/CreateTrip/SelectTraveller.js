import React,{useEffect} from "react";
import { View,Text,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function SelectTraveller(){
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Who's Travelling",
    });
  }, []);
    return(
        <View style={{padding:25,paddingTop:75,backgroundColor:'white',height:'100%'}}>
            <Text style={{fontSize:25,marginTop:20,fontWeight:'bold'}}></Text>

            <View style={{alignContent:'center'}}>
                <Text style={{fontSize:23,fontWeight:'bold'}}>Choose your companions</Text>
                
            </View>
        </View>
    )
}