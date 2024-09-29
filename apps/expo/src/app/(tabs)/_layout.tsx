import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { House, Info } from "lucide-react-native";

import Header from "~/components/Header";

const primary = "#4caf50";
const secondary = "#ffffff";
const tertiary = "#008134";

const { width, height } = Dimensions.get("window");

const tabBarHeight = height > 700 ? 64 : 56;
const tabBarFontSize = width > 350 ? 12 : 10;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={() => ({
        tabBarActiveTintColor: tertiary,
        tabBarInactiveTintColor: secondary,
        tabBarStyle: {
          position: "relative",
          height: tabBarHeight,
          borderColor: secondary,
          backgroundColor: primary,
          borderTopColor: secondary,
        },
        tabBarIconStyle: {
          position: "absolute",
          top: 25,
          color: secondary,
        },
        tabBarLabelStyle: {
          position: "absolute",
          top: 40,
          fontSize: tabBarFontSize,
          color: secondary,
          fontWeight: "medium",
        },
        tabBarAccessibilityLabel: "hello world",
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
