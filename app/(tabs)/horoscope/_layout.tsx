import { Stack } from 'expo-router'
import React from 'react'
const HoroscopeStack = () => {
  return (
    <Stack >
      <Stack.Screen name='index' options={{headerShown :false}}></Stack.Screen>
    </Stack>
  )
}

export default HoroscopeStack