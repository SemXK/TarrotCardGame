import { Stack } from 'expo-router'
import React from 'react'

const CardLayout = () => {
  return (
    <Stack >
      <Stack.Screen name='cardDetail' options={{headerShown :false}}></Stack.Screen>
    </Stack>
  )
}

export default CardLayout