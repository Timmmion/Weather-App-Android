import axios from "axios";
import { useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GetWeatherData from "./components/GetWeatherData";
import DateDisplay from "./components/DateDisplay";
import moment from "moment";
import HourDisplay from "./components/HourDisplay";
import { MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export default function App() {
  const [date, setDate] = useState<string>(moment().add(2, "hours").utc().format("YYYY-MM-DD"));
  const [hour, setHour] = useState<string>(moment().add(2, "hours").utc().format("HH"));
  const [textLongitude, setTextLongitude] = useState("");
  const [textLatitude, setTextLatitude] = useState("");
  const [state, setState] = useState("...");
  const [name, setName] = useState(storage.getString('location') || "");

  const handleName = (newText: string) => {
    setName(newText);
  };

  const searchLoc = () => {
    const apiKey = "INPUT API KEY HERE";
    const apiUrl = `https://api.api-ninjas.com/v1/geocoding`;

    setState("Loading ...");

    if (name.charAt(name.length - 1) === " ") {
      setName(name.trimEnd());
    }

    axios({
      method: "GET",
      url: apiUrl,
      params: {
        city: name,
        country: "Germany",
      },
      headers: {
        "X-Api-Key": apiKey,
      },
      responseType: "json",
    })
      .then((response) => {
        setTextLatitude(response.data[0].latitude);
        setTextLongitude(response.data[0].longitude);
        setState(response.data[0].state);
        storage.set('location',name)
      })
      .catch((error) => {
        setState("Could not retrieve data!");
      });
  };

  const handleDateChange = (selectedDate: string) => {
    setDate(selectedDate);
  };

  const handleHourChange = (selectedHour: string) => {
    setHour(selectedHour);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F0F0F0" />
      <View style={styles.inputBox}>
        <View style={styles.name}>
          <View style={{ flex: 1, height: 4, backgroundColor: "#282828" }} />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextInput
              style={styles.inputField}
              onChangeText={handleName}
              value={name}
              placeholder="Location"
              maxLength={18}
              placeholderTextColor="#282828"
            />
          </View>
          <View style={{ flex: 1, height: 4, backgroundColor: "#282828" }} />
        </View>
      </View>
      <GetWeatherData
        latitude={textLatitude}
        longitude={textLongitude}
        date={date}
        name={name}
        hour={hour}
        state={state}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "#DFDFDF",
          borderRadius: 10,
          width: "90%",
          elevation: 3,
          marginTop: 20,
        }}
      >
        <DateDisplay onDateChange={handleDateChange}></DateDisplay>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "#DFDFDF",
          borderRadius: 10,
          width: "90%",
          elevation: 3,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <HourDisplay onHourChange={handleHourChange}></HourDisplay>
      </View>

      <TouchableOpacity
        onPress={searchLoc}
        style={{
          backgroundColor: "lightblue",
          padding: 10,
          borderRadius: 30,
          width: "50%",
          alignSelf: "center",
          elevation: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: "100%",
    padding: 8,
    fontWeight: "bold",
    color: "#282828",
    fontSize: 35,
    textAlign: "center",
  },
  line: {
    borderBottomColor: "#282828",
    borderBottomWidth: StyleSheet.hairlineWidth,
    textAlignVertical: "center",
  },
  inputBox: {
    alignItems: "center",
    justifyContent: "center",
  },
});
