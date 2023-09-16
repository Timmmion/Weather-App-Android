import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import { Feather } from '@expo/vector-icons';

const HourDisplay: React.FC<{ onHourChange: (hour: string) => void }> = ({ onHourChange }) => {

    const [count, setCount] = useState(parseInt(moment().utc().add(2,'hours').format("HH")));
    const [prevHour, setPrevHour] = useState(count - 1);
    const [pastHour, setPastHour] = useState(count + 1);

    useEffect(() => {
       
        updateText();
        changeHour();
    }, [count]);

    const changeHour = () => {
        
        onHourChange(count.toString());
    }

    const riseCount = () => {
        if(count < 23){
            setCount(count + 1);  
        }else{
            setCount(0)
        }
    }

    const lowerCount = () => {
        if(count > 0){
            setCount(count - 1);  
        }else{
            setCount(22)
        }
    }
    const updateText = () => {

        if(count > 0){
            setPrevHour(count - 1);
        }else{
            setPrevHour(23);
        }
        

        if(count < 23){
            setPastHour(count + 1);
        }else{
            setPastHour(0)
        }
      }

      const formatNumberAsTwoDigits = (num: number): string => {
        if (num >= 0 && num <= 24) {
          return num.toString().padStart(2, '0');
        }else{
          return '00';
        }
      }

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.butLeft} onPress={lowerCount}>
          <Feather name="arrow-left" size={25} color="#282828" />
          <Text style={styles.text}>{formatNumberAsTwoDigits(prevHour)}</Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Text style={{ fontSize: 30, color: "#282828", fontWeight: "bold" }}>
            {formatNumberAsTwoDigits(count) + ":00"}
          </Text>
        </View>
        <TouchableOpacity style={styles.butRight} onPress={riseCount}>
          <Text style={styles.text}>{formatNumberAsTwoDigits(pastHour)}</Text>
          <Feather name="arrow-right" size={25} color="#282828" />
        </TouchableOpacity>
      </View>
    );
}

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

export default HourDisplay;
