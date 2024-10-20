// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { AppRegistry } from "react-native";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPqxOr_woWvRdAgJT6qMtIJnHHFkwPdk4",
  authDomain: "react-native-apps-dc81d.firebaseapp.com",
  projectId: "react-native-apps-dc81d",
  storageBucket: "react-native-apps-dc81d.appspot.com",
  messagingSenderId: "430974237077",
  appId: "1:430974237077:web:dd96017ce826452bc9de9c",
  measurementId: "G-LE8YRE3170"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//   });
const lstorage=getReactNativePersistence(ReactNativeAsyncStorage);
export const auth=initializeAuth(app,{persistence:lstorage,});
// export const auth= getAuth(app);