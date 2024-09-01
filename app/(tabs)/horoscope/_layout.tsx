import { Stack } from 'expo-router'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const HoroscopeStack = () => {
  return (
    <Stack >
      <Stack.Screen name='index' options={{headerShown :false}}></Stack.Screen>
      <Stack.Screen name='[sign]' options={{headerShown :false}}></Stack.Screen>
    </Stack>
  )
}

export default HoroscopeStack