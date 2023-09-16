import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons";

const size = 200;
interface WeatherState {
  state: string;
}

const DisplayWeatherIcon: React.FC<WeatherState> = ({ state }) => {
  let icon = null;


  if (state === "clear-day") {
    icon = <Feather name="sun" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "clear-night") {
    icon = <Ionicons name="moon-outline" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "fog") {
    icon = <MaterialCommunityIcons name="weather-fog" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "cloudy") {
    icon = <Ionicons name="cloudy-outline" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "partly-cloudy-day") {
    icon = <Ionicons name="partly-sunny-outline" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "partly-cloudy-night") {
    icon = <Ionicons name="cloudy-night-outline" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "sleet") {
    icon = <MaterialCommunityIcons name="weather-snowy-rainy" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "rain") {
    icon = <Ionicons name="rainy-outline" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "wind") {
    icon = <MaterialCommunityIcons name="weather-windy" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "snow") {
    icon = <Ionicons name="snow-outline" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "hail") {
    icon = <MaterialCommunityIcons name="weather-hail" size={size} color="#090909" style={styles.self}/>;
  } else if (state === "thunderstorm") {
    icon = <Ionicons name="thunderstorm-outline" size={size} color="#090909" style={styles.self}/>;
  }
  return (
    <View >
      <View>
      {icon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  self: {
    alignSelf: 'center',
    backgroundColor: "transparent",
    margin: 15,
    width: size,
    height: size,
    color: 'lightblue',   
  },
});

export default DisplayWeatherIcon;
