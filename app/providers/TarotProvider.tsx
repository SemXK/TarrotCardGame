import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import React from 'react'

export const TarotContext = createContext({})


const TarotProvider = ({children}:PropsWithChildren) => {
  let [items, setItems] = useState([])
  // 1* Api
  useEffect(() => {
    fetch("https://tarotapi.dev/api/v1/cards")
      .then(function (response) {
        return response.json();
      })
      .then(function ({cards}) {
        setItems(cards)
      })
  }, [])
  // 1* Component hooks
  return (
    <TarotContext.Provider value={{items, onAddItem: () => {}}}>
      {children}
    </TarotContext.Provider>
  )
}
export const getCardData = ():any => {
  return useContext(TarotContext)
}
export default TarotProvider 