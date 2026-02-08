import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "grey",
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.OS === "ios" ? "transparent" : "white",
          borderTopWidth: 0,
          elevation: 5,
          height: 70,
          bottom: 10, 
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? <BlurView tint="light" intensity={70} style={{ flex: 1 }} /> : null,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Network"
        options={{
          title: "Network",
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={36} color={color} />,
        }}
      />

      <Tabs.Screen
        name="AboutMe" 
        options={{
          title: "About Me", 
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
