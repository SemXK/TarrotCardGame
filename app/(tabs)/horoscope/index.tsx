import React from "react";
import {
  Appearance,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatGrid } from "react-native-super-grid";
import SvgUri from "react-native-svg-uri";
import zodiacList from "@/assets/zodiacList";
import { Link } from "expo-router";
const colorScheme = Appearance.getColorScheme();

const HoroscopeSignList = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <FlatGrid
        style={styles.grid}
        data={zodiacList}
        spacing={5}
        renderItem={(zodiac) => {
          return (
            <Link style={styles.singleSign} href={`/horoscope/${zodiac.item.name}?zodiacIndex=${zodiac.index}`} asChild>
              <TouchableOpacity activeOpacity={0.1} style={styles.gridItem}>
                <Image
                  tintColor={colorScheme == "dark" ? "white" : "black"}
                  style={styles.gridItemImage}
                  source={zodiac.item.file}
                />
                <Text style={styles.gridItemText}>{zodiac.item.name}</Text>
              </TouchableOpacity>
            </Link>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  grid: {
    flex: 1,
    height: "100%",
  },
  gridItem: {
    flex: 1,
    margin: 10,
  },
  singleSign: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  gridItemText: {
    textAlign: "center",
    color: colorScheme == "dark" ? "white" : "black",
  },
  gridItemImage: {
    alignSelf: "center",
    resizeMode: "stretch",
    aspectRatio: 1 / 1,
    height: "100%",
    width: "100%",
  },
});
export default HoroscopeSignList;
