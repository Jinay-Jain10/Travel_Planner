import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { CreateTripContext } from "../Context/CreateTripContext";

const API_KEY = '-'; // Replace with your actual API key

const SearchPlace = () => {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [city, setCity] = useState(null);
  const [cityUrl, setCityUrl] = useState(null); // State to hold the city URL

  const fetchPlaces = async (input) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response: ", data);
      setSuggestions(data.features || []);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.features.length > 0) {
        const { lat, lon, name } = data.features[0].properties;
        setCoordinates({ lat, lon });
        setCity(name || data.features[0].properties.formatted); // Fallback to formatted name
        const url = `https://www.geoapify.com/geoapify-api/#places/${data.features[0].properties.place_id}`; // Example URL construction
        setCityUrl(url); // Store the city URL

        console.log(`Coordinates: Latitude = ${lat}, Longitude = ${lon}, City = ${name}, URL = ${url}`);

        // Prepare trip data
        const locationInfo = {
          name: name || data.features[0].properties.formatted,
          coordinates: { lat, lon },
          url, // Add the city URL to the location info
        };

        // Update tripData with location information
        setTripData({ locationInfo });

        // Log the trip data being set
        // console.log('Setting Trip Data:', locationInfo);
        navigation.navigate("SelectTraveller");
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const handleSelectSuggestion = (place) => {
    const address = place.properties.formatted;
    setQuery(address);
    setSuggestions([]);
    fetchCoordinates(address); // Call to fetch coordinates and update tripData
  };

  const handleInputChange = (text) => {
    setQuery(text);
    if (text.length > 2) {
      fetchPlaces(text);
    } else {
      setSuggestions([]);
    }
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSelectSuggestion(item)} // Handle suggestion selection
    >
      <Text>{item.properties.formatted}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a place"
        value={query}
        onChangeText={handleInputChange}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.properties.place_id.toString()}
          renderItem={renderSuggestion}
        />
      )}
      {coordinates && (
        <View style={styles.coordinates}>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: "white",
    height: "100%",
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingHorizontal: 15,
    borderRadius: 15,
    fontSize: 15,
    marginTop: 20,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  coordinates: {
    marginTop: 20,
  },
});

export default SearchPlace;
