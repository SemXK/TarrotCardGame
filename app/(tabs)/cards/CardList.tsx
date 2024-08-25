import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FlatGrid } from 'react-native-super-grid';
import { useFonts } from 'expo-font';
import cardList from '@/assets/cardList';
import { Link, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';


// * Component
export default function TabOneScreen() {
  // 1* Component's hooks
  let [cardData, setCardData]:any = useState([])
  useEffect(() => {
    fetch("https://tarotapi.dev/api/v1/cards")
      .then(function (response) {
        return response.json();
      })
      .then(function ({cards}) {
        setCardData(cards)
      })
  }, [])

  // 1* Component's return
  return (
    <View style={{marginTop:40}} >
        <Text style={styles.header}>
          Galleria dei Tarocchi
        </Text>
        {/* More info on grid = https://github.com/saleel/react-native-super-grid?tab=readme-ov-file */}
        <FlatGrid
          adjustGridToStyles={true}
          data={cardData}
          itemDimension={100}
          spacing={5}
          renderItem={({index}) => {
            return (
              <Link style={styles.singleCard} href={`/cards/${index}?cardCode=${cardData[index].name_short}`} asChild>
                <TouchableOpacity style={styles.cardContainer} activeOpacity={.8}>
                  <Image style={styles.card} source={cardList[index]}></Image>
                </TouchableOpacity>
              </Link>
            )
          }}
        />
    </View>
  );

}

const styles = StyleSheet.create({
  singleCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  cardContainer: {
    width:"100%",
    paddingHorizontal:"auto",
    aspectRatio: 1 / 2,
  },
  card: {
    alignSelf: "center",
    resizeMode: "stretch",
    height: "100%",
    width: "100%",
  },
  header:{
    textAlign: "center",
    fontFamily: "Pamela",
    fontSize:40
  }
});
