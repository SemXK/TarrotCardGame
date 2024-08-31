import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import TarotProvider from "../providers/TarotProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <TarotProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
        >
        <Tabs.Screen
          name="cards"
          options={{
            title: "All Cards",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cards-playing-club-multiple"
                size={24}
                color={colorScheme == "dark" ? "white" : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="prediction"
          options={{
            title: "Prediction",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="batch-prediction"
                size={24}
                color={colorScheme == "dark" ? "white" : "black"}
              />
            ),
          }}
        />
              <Tabs.Screen
          name="horoscope"
          options={{
            title: "Horoscope",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="star-of-david"
                size={24}
                color={colorScheme == "dark" ? "white" : "black"}
              />
            ),

          }}
      />
      </Tabs>

    </TarotProvider>
  );
}
