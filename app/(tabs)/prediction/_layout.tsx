import { Stack } from 'expo-router'
import React from 'react'
const CardLayout = () => {
  return (
    <Stack >
      <Stack.Screen name='index' options={{headerShown :false}}></Stack.Screen>
      <Stack.Screen name='predictions' options={{headerShown :false}}></Stack.Screen>
    </Stack>
  )
}

export default CardLayout