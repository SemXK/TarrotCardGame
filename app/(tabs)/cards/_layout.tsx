import { Stack } from 'expo-router'
import React from 'react'
const CardLayout = () => {
  return (
    <Stack >
      <Stack.Screen name='CardList' options={{headerShown :false}}></Stack.Screen>
      <Stack.Screen name='[idCard]' options={{headerTitle: "header"}}></Stack.Screen>
    </Stack>
  )
}

export default CardLayout