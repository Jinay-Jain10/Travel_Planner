import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, ToastAndroid} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './../Configs/FireBaseConfig'

export default function Login({navigation}) {

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();


  const onSignIn=()=>{

    if(!email && !password)
    {
      ToastAndroid.show("Please enter Email & Password",ToastAndroid.LONG)
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigation.navigate("MyTrip");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode)
    if(errorCode=='auth/invalid-email'|| 'auth/invalid-credential')
    {
      ToastAndroid.show("Invalid Credentials",ToastAndroid.LONG)
    }
  });

  }


    return (
      <View >
        
        <View style={{padding:25,paddingTop:50,backgroundColor:'white',height:'100%'}}>
            <TouchableOpacity onPress={()=>navigation.navigate("Landing")}>
                <Ionicons name="arrow-back" size={28} color="black" />     
            </TouchableOpacity>
          <Text style={{fontSize:30,fontWeight:'bold',marginTop:10}}>Let's Sign You In!</Text>
          <Text style={{fontSize:30,color:'grey',marginTop:20}}>Welcome Back</Text>
          <Text style={{fontSize:30,color:'grey',marginTop:10}}>You've been missed!</Text>
        
          <View style={{marginTop:50}}>
            <Text style={{marginLeft:5,marginBottom:5,fontSize:18}} >Email</Text>
            <TextInput  
              autoCapitalize="none"
              autoCorrect={true}
              keyboardType="email-address" 
              style={styles.input} 
              placeholder='Enter Email'
              onChangeText={(value)=>setEmail(value)}
              />

            <Text style={{marginLeft:5,marginBottom:5,marginTop:15,fontSize:18}} >Password</Text>
            <TextInput 
            keyboardType="password" 
            style={styles.input} 
            placeholder='Enter Password'
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(value)=>setPassword(value)}
            />
          </View>

        <View>


        <TouchableOpacity 
        onPress={onSignIn}
        style={styles.button}>
            <Text style={{color:'white',textAlign:'center',fontSize:15}}>Sign-In</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>navigation.navigate("Signup")}
        style={{padding:15,
            backgroundColor:'white',
            borderRadius:99,
            marginTop:20, 
            borderWidth:1}}>
            <Text style={{color:'black',textAlign:'center',fontSize:15}}>Create Account</Text>
        </TouchableOpacity>
        </View>
        </View>

        

        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    input:{
        padding:15,
        borderWidth:1,
        borderRadius:15,
        borderColor:'grey',
        fontSize:15
    },
    button:{
    padding:15,
    backgroundColor:'black',
    borderRadius:99,
    marginTop:50
  }
  });