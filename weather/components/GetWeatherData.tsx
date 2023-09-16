import axios, { all } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateDisplay from "./DateDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import DisplayWeatherIcon from "./DisplayWeatherIcon";
import { AntDesign } from "@expo/vector-icons";
import ComponentBox from "./ComponentBox";
import { Entypo } from "@expo/vector-icons";

interface WeatherDataProps {
  latitude: string;
  longitude: string;
  date: string;
  name: string;
  hour: string;
  state: string;
}

const GetWeatherData: React.FC<WeatherDataProps> = ({
  latitude,
  longitude,
  date,
  name,
  hour,
  state,
}) => {
  const [temperature, setTemperature] = useState<string>("/");
  const [highestTemperature, setHighestTemperature] = useState<string>("/");
  const [lowestTemperature, setLowestTemperature] = useState<string>("/");
  const [locationName, setLocationName] = useState<string>("/");
  const [windSpeed, setWindSpeed] = useState<string>("/");
  const [precipitation, setPrecipitation] = useState<string>("/");
  const [cloudCover, setCloudCover] = useState<string>("/");
  const [weatherState, setWeatherState] = useState("clear-day");

  let allTemp: number[] = [];
  let allWindSpeed: number[] = [];
  let allPrecipitation: number[] = [];
  let allCloudCoverage: number[] = [];

  useEffect( () => {
    axios
      .get(`https://api.brightsky.dev/weather?lat=${latitude}&lon=${longitude}&date=${date}`)
      .then((response) => {
        //HIGHEST AND LOWEST TEMPERATURE
        for (let i = 0; i < 24; i++) {
          allTemp.push(response.data.weather[i].temperature);
        }
        allTemp.sort((n1, n2) => n1 - n2);
        setHighestTemperature(allTemp[23].toString());
        setLowestTemperature(allTemp[0].toString());

        //CURRENT TEMPERATURE
        const currentTemp = response.data.weather[hour].temperature;
        setTemperature(currentTemp);

        //LOCATION
        const locName = response.data.sources[0].station_name;
        setLocationName(locName);

        //WIND SPEED kmh
        for (let i = 0; i < 24; i++) {
          allWindSpeed.push(response.data.weather[i].wind_speed);
        }
        allWindSpeed.sort((n1, n2) => n1 - n2).reverse();
        setWindSpeed(allWindSpeed[0].toString());

        //PERCIPITATION
        for (let i = 0; i < 24; i++) {
          allPrecipitation.push(response.data.weather[i].precipitation);
        }
        allPrecipitation.sort((n1, n2) => n1 - n2).reverse();
        setPrecipitation(allPrecipitation[0].toString());

        //CLOUD COVER
        for (let i = 0; i < 24; i++) {
          allCloudCoverage.push(response.data.weather[i].cloud_cover);
        }

        let sum = 0;
        for (let i = 0; i < 24; i++) {
          sum += allCloudCoverage[i];
        }
        sum = sum / 24;
        setCloudCover(Math.round(sum).toString());

        setWeatherState(response.data.weather[hour].icon);
      })
      .catch((error) => {
        setTemperature("/");
        setHighestTemperature("/");
        setLowestTemperature("/");
        setLocationName("/");
        setWindSpeed("/");
        setPrecipitation("/");
        setCloudCover("/");
        console.log("COULDN'T RETRIEVE DATA", error);
      });
  }, [latitude, longitude, date, hour]);

  return (
    <View>
      <Text style={styles.state}>{state}</Text>
      <DisplayWeatherIcon state={weatherState}></DisplayWeatherIcon>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#DFDFDF",
            borderRadius: 30,
            width: "34%",
            elevation: 3,
          }}
        >
          <Entypo name="chevron-up" size={35} color="#282828" />
          <Text style={styles.text}>{highestTemperature}°C</Text>
          <Entypo name="chevron-up" size={35} color="#282828" />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#DFDFDF",
            borderRadius: 30,
            width: "34%",
            elevation: 3,
          }}
        >
          <Entypo name="chevron-down" size={35} color="#282828" />
          <Text style={styles.text}>{lowestTemperature}°C</Text>
          <Entypo name="chevron-down" size={35} color="#282828" />
        </View>
      </View>
      <View style={styles.information}>
        <View>
          <ComponentBox iconName="temperature" unit="°C" value={temperature}></ComponentBox>
          <ComponentBox iconName="windSpeed" unit=" kmh" value={windSpeed}></ComponentBox>
        </View>

        <View>
          <ComponentBox iconName="precipitation" unit=" mmh" value={precipitation}></ComponentBox>
          <ComponentBox iconName="cloudCover" unit="%" value={cloudCover}></ComponentBox>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  state: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
  temp: {
    fontWeight: "bold",
  },
  information: {
    flexDirection: "row",
    margin: 10,
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 18,
    color: "#282828",
  },
});

export default GetWeatherData;
