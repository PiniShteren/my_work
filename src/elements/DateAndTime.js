import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper';

export default function DateAndTime({ }) {

  const { colors } = useTheme();
  const styles = stylesR(colors);

  const [date, setDate] = useState(new Date());

  const getHebrewDate = (date) => {
    var daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    var months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

    var dayOfWeek = daysOfWeek[date.getDay()];
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var hebrewDate = dayOfWeek + ', ' + day + ' ' + month + ' ' + year;
    return hebrewDate;
  }

  const getFormattedTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');

    return formattedTime;
  }

  useEffect(() => {
    let interval;
    interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.time}>({getFormattedTime(date)})</Text>
      <Text style={styles.date}>{getHebrewDate(date)}</Text>
    </View>
  )
}

const stylesR = (colors) => StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: "1.3vw",
    fontWeight: "700",
  },
  time: {
    fontSize: "1vw",
    fontWeight: "700",
    marginRight: "0.5vw",
    color: colors.iconLight
  }
})