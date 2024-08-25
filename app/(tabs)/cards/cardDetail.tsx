import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { FlatGrid } from 'react-native-super-grid';

import { useFonts } from 'expo-font';
import cardList from '@/assets/cardList';
export default function TabOneScreen() {

  const [loaded, error] = useFonts({
    Pamela: require('../../../assets/fonts/TarotPamelaColmanSmith-Regular.ttf'),
  });
  return (
    <View style={{marginTop:40}} >
        <Text style={styles.header}>
          Galleria dei Tarocchi
        </Text>
        {/* More info on grid = https://github.com/saleel/react-native-super-grid?tab=readme-ov-file */}
        <FlatGrid
        adjustGridToStyles={true}
        data={cardList}
        itemDimension={100}
        spacing={5}
        renderItem={({index}) => {
          return (
            <View  style={styles.singleCard}>
              <TouchableOpacity style={styles.cardContainer} activeOpacity={.8}>
                <Image style={styles.card} source={cardList[index]}></Image>
              </TouchableOpacity>
            </View>
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
