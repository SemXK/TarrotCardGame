import zodiacList from "@/assets/zodiacList";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Appearance, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colorScheme = Appearance.getColorScheme();
interface Horoscope {
  date: String | null;
  horoscope_data: String | null;
}

const days = ["YESTERDAY", "TODAY", "TOMORROW"];
// * Component
const ZodiacDetail = () => {
  // 1* Components variables
  const { sign, zodiacIndex } = useLocalSearchParams();
  const [zodiacInfo, setZodiacInfo] = useState<Horoscope>({
    date: null,
    horoscope_data: null,
  });
  const [day, setDay] = useState("TODAY");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(
      `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${day}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function ({ data }) {
        setZodiacInfo(data);
        setLoading(false);
      });
  }, [day]);

  // 1* Component return
  return (
    <SafeAreaView style={styles.container}>

      {/* Top bar */}
      <View style={styles.topBar}>
        {days.map(D => {
          return (
            <TouchableOpacity onPress={() => setDay(D)} style={styles.barItem}>
              <Text style={{textAlign:"center", opacity:D == day ? 1 : .3}}>{D}</Text>
              {D == day && <View style={styles.topBarChosen}></View>}
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Zodiac sign + info */}
      <View style={styles.zodiacContainer}>
        <Text style={styles.zodiacTitle}>{sign}</Text>
        <Image
          tintColor={colorScheme == "dark" ? "white" : "black"}
          style={styles.zodiacImage}
          source={zodiacList[Number(zodiacIndex)].file}
        />
        {!loading && (
          <View style={{ gap: 45 }}>
            <Text style={styles.zodiacDesc}>{zodiacInfo.horoscope_data}</Text>
          </View>
        )}
        {loading && <Text style={styles.zodiacDesc}>Loading.....</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  zodiacContainer: {
    flex:1,
    justifyContent: "center",
    position:"relative"
  },
  topBar: {
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10,
    alignSelf: "center",
    width: "100%",
  },
  barItem:{
    width:"33%",
    padding:10
  },
  topBarChosen:{
    height:2,
    backgroundColor:"black",
    position:"absolute",
    width:"75%",
    bottom:0,
    alignSelf:"center"
  },
  zodiacImage: {
    alignSelf: "center",
    aspectRatio: 1,
    marginVertical: 25,
  },
  zodiacTitle: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Pamela",
  },
  zodiacDesc: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Pamela",
  },
  zodiacTimestamps: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Pamela",
  },
});

export default ZodiacDetail;
