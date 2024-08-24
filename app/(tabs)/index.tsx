import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { FlatGrid } from 'react-native-super-grid';
import cards from '../../assets/cardList'
export default function TabOneScreen() {
  return (
    <View style={{marginTop:40}}>

        {/* More info on grid = https://github.com/saleel/react-native-super-grid?tab=readme-ov-file */}
        <FlatGrid
        adjustGridToStyles={true}
        data={cards}
        itemDimension={100}
        spacing={5}
        renderItem={({index}) => {
          return (
            <View  style={styles.singleCard}>
              <TouchableOpacity style={styles.cardContainer} activeOpacity={.8}>
                <Image style={styles.card} source={cards[index]}></Image>
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
});
