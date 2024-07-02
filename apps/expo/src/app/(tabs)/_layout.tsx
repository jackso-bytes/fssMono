import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const primaryColor = "#4caf50";
const secondaryColor = "#ffffff";
const focussedColor = "#a8ec6f";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: focussedColor,
        tabBarInactiveTintColor: secondaryColor,
        tabBarStyle: {
          height: 65,
          borderColor: secondaryColor,
          borderTopColor: secondaryColor,
          backgroundColor: primaryColor,
        },
        tabBarIconStyle: {
          marginTop: 10,
          color: secondaryColor,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: secondaryColor,
          fontWeight: "medium",
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="home"
              color={focused ? focussedColor : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="info-circle"
              color={focused ? focussedColor : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Summary",

          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="bar-chart"
              color={focused ? focussedColor : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
