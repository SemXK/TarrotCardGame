import { View } from "@/components/Themed";
import { Image, ScrollView, ScrollViewBase, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import cardList from "@/assets/cardList";
import { FlatGrid } from "react-native-super-grid";
import {Appearance} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const colorScheme = Appearance.getColorScheme();

const CardDetail = () => {
  // 1* Components variables
  const {idCard, cardCode} = useLocalSearchParams();
  let [cardData, setCardData]: any = useState({});

  useEffect(() => {
    fetch(`https://tarotapi.dev/api/v1/cards/${cardCode}`)
      .then(function (response) {
        return response.json();
      })
      .then(function ({ card }) {
        setCardData(card);
      })
  }, []);

  return (
    <>
      {cardData.value && (
        <SafeAreaView  style={styles.container}>
          <ScrollView>

          <Text style={styles.cardTitle}>{cardData.name}</Text>
          <Image style={styles.card} source={cardList[Number(idCard)]}></Image>
          <SafeAreaView style={{flex: 1}}>

            <FlatGrid
              adjustGridToStyles={true}
              data={cardData.meaning_up.split(/[;]+/)}
              itemDimension={250}
              scrollEnabled={false}
              spacing={10}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardMeaningText}>
                    <Text style={{...styles.cardMeaning, color:colorScheme == 'dark' ? 'white' : 'black'}}>{item}</Text>
                  </View>
                )
              }}
            />
          </SafeAreaView>

          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "flex-start",
    // height: "100%",
  },
  cardTitle: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Pamela",
    fontSize: 40,
    backgroundColor: colorScheme != 'dark' ? 'white' : 'black',
    position: "static",
    top:0,
    color:colorScheme == 'dark' ? 'white' : 'black'
  },
  cardMeaning: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Pamela",
    fontSize:  20,
    color:colorScheme == 'dark' ? 'white' : 'black'
  },
  cardMeaningText:{
    backgroundColor: colorScheme == 'dark' ? '#30302f' : '#d4d4d4',
    borderRadius: 10,
    padding: 10,
  },
  card: {
    alignSelf: "center",
    resizeMode: "stretch",
  },
});
export default CardDetail;
