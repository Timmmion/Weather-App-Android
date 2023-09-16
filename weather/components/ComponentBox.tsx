import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
interface CompProps {
  iconName: string;
  value: string;
  unit: string;
}

const size = 30;

const ComponentBox: React.FC<CompProps> = ({ iconName, value, unit }) => {
  let icon = null;

  if (iconName === "temperature") {
    icon = <FontAwesome name={"thermometer"} size={size} color="#090909" />;
  } else if (iconName === "windSpeed") {
    icon = <Feather name="wind" size={size} color="#090909" />;
  } else if (iconName === "precipitation") {
    icon = <Ionicons name="water-outline" size={size} color="#090909" />;
  } else if (iconName === "cloudCover") {
    icon = <Ionicons name="cloudy-outline" size={size} color="#090909" />;
  } else {
    icon = <Feather name="sun" size={24} color="#090909" />;
  }

  return (
    <View>
      <View style={styled.container}>
        <Text style={styled.text}>
          {icon} {value + unit}
        </Text>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    borderRadius: 20,
    margin: 5,
    height: 100,
    width: 175,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFDFDF",
    elevation: 3
  },
  text: {
    fontSize: size,
    color: "#090909",
  },
});

export default ComponentBox;
