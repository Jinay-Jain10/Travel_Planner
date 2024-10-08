import React,{useState} from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './../Configs/FireBaseConfig'


export default function Signup({ navigation }) {

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFullName]=useState();



const onCreateAccount=()=>{

  if(!email && !password && !fullName)
  {
    ToastAndroid.show('Please Enter all details',ToastAndroid.BOTTOM);
    return ;
  }

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    navigation.navigate("Login");
    ToastAndroid.show('Now Login with the same credentials.',ToastAndroid.LONG);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    if(errorCode=='auth/email-already-in-use')
      {
        Alert.alert('Account already exists. Please Login or create another account.') ;    
      }
    // ..
  });
  }



  return (
    <View style={{ padding: 25, paddingTop: 50,height:'100%',backgroundColor:'whie' }}>

    <TouchableOpacity onPress={()=>navigation.navigate("Landing")}>
      <Ionicons name="arrow-back" size={28} color="black" />     
    </TouchableOpacity>
      <Text style={{ fontSize: 35, fontWeight: "bold",marginTop:20 }}>Create Account</Text>
      <View style={{ marginTop: 50 }}>

      <Text style={{ marginLeft: 5, marginBottom:5, fontSize: 18 }}>
        Full Name
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={true}
          keyboardType="email-address"
          style={styles.input}
          placeholder="Enter Full Name"
          onChangeText={(value)=>setFullName(value)}
        />


        <Text style={{ marginLeft: 5, marginBottom: 5, fontSize: 18 }}>
          Email
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={true}
          keyboardType="email-address"
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(value)=>setEmail(value)}
        />

        <Text
          style={{
            marginLeft: 5,
            marginBottom: 5,
            fontSize: 18,
          }}
        >
          Password
        </Text>
        <TextInput
          keyboardType="password"
          style={styles.input}
          placeholder="Enter Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(value)=>setPassword(value)}
        />

<View>
        <TouchableOpacity 
        onPress={onCreateAccount}
        style={styles.button}>
            <Text style={{color:'white',textAlign:'center',fontSize:15}}>Create Account</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>navigation.navigate("Login")}
        style={{padding:15,
            backgroundColor:'white',
            borderRadius:99,
            marginTop:20, 
            borderWidth:1}}>
            <Text style={{color:'black',textAlign:'center',fontSize:15}}>Log-In</Text>
        </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
    fontSize: 15,
    marginBottom:10
  },
  button: {
    padding: 15,
    backgroundColor: "black",
    borderRadius: 99,
    marginTop: 50,
  },
});
