import { Image, StyleSheet, TouchableOpacity, TouchableOpacityBase } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import cardList from '@/assets/cardList';
import { useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function TabTwoScreen() {
  // 1* Components hooks
  let [card, setCard] = useState(0)
  let [flipped, setFlipped] = useState(false)

  // 1* Custom variables
  const spin = useSharedValue<number>(0);

  // 1* Animations
  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const frontAnimatedStyle = useAnimatedStyle(() => {
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
    <Animated.View style={[styles.back, backAnimatedStyle ]}>
      <TouchableOpacity activeOpacity={.6} onPress={() => {
      }}>
        <Image source={cardList[cardList.length - 1]}/>
      </TouchableOpacity>
    </Animated.View>

    {/* Front Card */}
    <Animated.View style={[styles.front, frontAnimatedStyle ]}>
      <TouchableOpacity activeOpacity={.6} onPress={() => {
        spin.value = spin.value ? 0 : 1;
        if(spin.value) {
          setCard(Math.round(Math.random() * cardList.length))
        }
      }}>
        <Image source={cardList[card]}/>
      </TouchableOpacity>
    </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back:{
    height: 400,
    width: 250,
    backgroundColor: "#FF8787",
    borderRadius: 16,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  front:{
    height: 400,
    width: 250,
    backgroundColor: "#D8D9CF",
    backfaceVisibility:'hidden',
    borderRadius: 16,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    
  }

});
