import {
  Appearance,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import cardList from "@/assets/cardList";
import { useEffect, useRef, useState } from "react";
import Animated, {
  FadeInUp,
  FadeOut,
  FadeOutUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getCardData } from "@/app/providers/TarotProvider";
import { FlatGrid } from "react-native-super-grid";
import { SafeAreaView } from "react-native-safe-area-context";

const colorScheme = Appearance.getColorScheme();

export default function TabTwoScreen() {
  // 1* Components hooks
  let [card, setCard] = useState(Math.round(Math.random() * cardList.length - 1));
  let [showDesc, setShowDesk] = useState(false);

  let [cardData, setCardData] = useState(getCardData().items);
  let [flipped, setFlipped] = useState(false);


  // 1* Custom variables
  const spin = useSharedValue<number>(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  // 1* Component render
  return (
      <View style={styles.container}>
        {/* Back Card */}
        <Animated.View style={[styles.back, backAnimatedStyle]}>
          <TouchableOpacity activeOpacity={1} >
            <Image source={cardList[cardList.length - 1]} />
          </TouchableOpacity>
        </Animated.View>

        {/* Front Card */}
        <Animated.View style={[styles.front, frontAnimatedStyle]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              spin.value = spin.value ? 0 : 1;
              if (spin.value) {
                setShowDesk(false)
              }
              else{
                setCard(Math.round(Math.random() * cardList.length - 1));
                setShowDesk(true)
              }
            }}
          >
            <Image source={cardList[card]} />
          </TouchableOpacity>
        </Animated.View>
        <ScrollView>

          {(showDesc ) && 
            <Animated.View   
            entering={FadeInUp.duration(400)}
            exiting={FadeOut.duration(400)}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <FlatGrid
                  adjustGridToStyles={true}
                  data={cardData[card].meaning_up.split(/[;]+/)}
                  itemDimension={250}
                  scrollEnabled={false}
                  spacing={10}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.cardMeaningText}>
                        <Text
                          style={{
                            ...styles.cardMeaning,
                            color: colorScheme == "dark" ? "white" : "black",
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </SafeAreaView>
            </Animated.View>
          }
        </ScrollView>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "25%",
    justifyContent: "flex-start",
  },
  back: {
    height: 400,
    width: 250,
    borderRadius: 16,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:40

  },
  front: {
    height: 400,
    width: 250,
    backfaceVisibility: "hidden",
    borderRadius: 16,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:40
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
  cardTitle: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Pamela",
    fontSize: 40,
    position: "static",
    top: 0,
    color: colorScheme == "dark" ? "white" : "black",
  },
});








