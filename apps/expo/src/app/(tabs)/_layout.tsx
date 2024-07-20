import React from "react";
import { Tabs } from "expo-router";
import { BarChart3, House, Info } from "lucide-react-native";

import Header from "~/components/Header";

const primary = "#4caf50";
const secondary = "#ffffff";
const tertiary = "#008134";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={() => ({
        tabBarActiveTintColor: tertiary,
        tabBarInactiveTintColor: secondary,
        tabBarStyle: {
          height: 64,
          borderColor: secondary,
          borderTopColor: secondary,
          backgroundColor: primary,
        },
        tabBarIconStyle: {
          marginTop: 8,
          color: secondary,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: secondary,
          fontWeight: "medium",
          marginBottom: 8,
        },
        header: () => <Header />,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <House size={28} color={focused ? tertiary : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Info size={28} color={focused ? tertiary : color} />
          ),
        }}
      />
    </Tabs>
  );
}
