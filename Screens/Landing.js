import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import { auth } from '../Configs/FireBaseConfig';

export default function Landing({navigation}) {

  function TaketoMyTrip(){
  navigation.navigate("MyTrip");
}

  
  const user=auth.currentUser;

  return (
    // user? TaketoMyTrip:[
    <View >
      <Image source={require('./../assets/landingimage.jpg')}
      style={{width:'100%',height:480}}
      />
      <View style={styles.container}>
        <Text style={{fontSize:25,marginTop:10,fontWeight:'bold',textAlign:'center'}}>
            AI Travel Planner
        </Text>
        <Text style={{fontsize:20,textAlign:'center',color:'gray',fontWeight:500,paddingTop:15}}>
            Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven unsights.
        </Text>

        <TouchableOpacity 
        style={styles.button}
        onPress={()=>navigation.navigate("Login")}
        >
            <Text style={{color:'white',textAlign:'center',fontSize:15}}>Sign-In with Google</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
    // ]
    
  );
}

// function TaketoMyTrip(){
//   navigation.navigate("MyTrip");
// }

// export default function Landing({navigation}){
//   const user=auth.currentUser;
//   return(
//     user? TaketoMyTrip():LandingShow()
//   )
// }


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop:-20,
    height:'100%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:15,
  },
  button:{
    padding:15,
    backgroundColor:'black',
    borderRadius:99,
    marginTop:'20%'
  }
});
