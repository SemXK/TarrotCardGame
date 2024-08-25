import { Redirect } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const CardIndex = () => {
  return <Redirect href={'/cards/cardDetail/'} />
}

export default CardIndex