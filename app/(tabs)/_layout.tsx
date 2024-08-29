import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
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
            headerRight: () => (
              <Link href="/cards" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="prediction"
          options={{
            title: "Prediction",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="stars"
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
