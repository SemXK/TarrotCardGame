import { View } from "@/components/Themed";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import cardList from "@/assets/cardList";

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
        <View style={styles.container}>
          <Text style={styles.cardTitle}>{cardData.name}</Text>
          <Image
            style={styles.card}
            source={cardList[Number(idCard)]}
          ></Image>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
  },
  cardTitle: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Pamela",
    fontSize: 40
  },
  card: {
    alignSelf: "center",
    resizeMode: "stretch",
  },
});
export default CardDetail;
