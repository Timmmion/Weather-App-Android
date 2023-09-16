import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";

const DateDisplay: React.FC<{ onDateChange: (date: string) => void }> = ({ onDateChange }) => {
  const [count, setCount] = useState(0);

  const [lowerText, setLowerText] = useState<string>(
    moment()
      .utc()
      .add(count - 1, "days")
      .add(2, "hours")
      .format("DD.MM")
  );
  const [higherText, setHigherText] = useState<string>(
    moment()
      .utc()
      .add(count + 1, "days")
      .add(2, "hours")
      .format("DD.MM")
  );

  useEffect(() => {
    updateText();
    changeDate();
    
  }, [count]);

  const changeDate = () => {
    const newDate = moment().utc().add(count, "days").add(2, "hours").format("YYYY-MM-DD");
    onDateChange(newDate);
  };

  const riseCount = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const lowerCount = () => {
    if (count > -5) {
      setCount(count - 1);
    }
  };

  const updateText = () => {
    setLowerText(
        moment()
          .utc()
          .add(count - 1, "days")
          .add(2, "hours")
          .format("DD.MM")
      );
      setHigherText(
        moment()
          .utc()
          .add(count + 1, "days")
          .add(2, "hours")
          .format("DD.MM")
      );
  }
 
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.butLeft} onPress={lowerCount}>
        <Feather name="arrow-left" size={25} color="#282828" />
        <Text style={styles.text}>{lowerText}</Text>
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <Text style={{ fontSize: 30, color: "#282828", fontWeight: "bold" }}>
          {moment().utc().add(count, "days").add(2, "hours").format("DD.MM")}
        </Text>
      </View>
      <TouchableOpacity style={styles.butRight} onPress={riseCount}>
        <Text style={styles.text}>{higherText}</Text>
        <Feather name="arrow-right" size={25} color="#282828" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  butRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  butLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },
  centerText: {
    fontSize: 25,
    color: "#282828",
    fontWeight: "bold",
  },
  text: {
    fontSize: 25,
    color: "#282828",
  },
});

export default DateDisplay;
