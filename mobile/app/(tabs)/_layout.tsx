import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";
import { useAuthStore } from "../../store/auth";

export default function TabLayout() {
  const userRole = useAuthStore((state) => state.userRole);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          display: userRole === "doctor" ? "none" : "flex",
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ) : undefined,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#8D99AE",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          padding: 8,
          height: 60,
        },
        tabBarIconStyle: {
          width: 44,
          height: 33,
        },
        tabBarPressColor: "transparent",
        tabBarPressOpacity: 0.8,
      }}
    >
      <Tabs.Screen
        name="patientHome"
        options={{
          href: userRole === "patient" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={userRole === "patient" ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="doctorHome"
        options={{
          href: userRole === "doctor" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={userRole === "doctor" ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="prescriptions"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="medical"
              size={focused ? size + 4 : size}
              color={color}
              style={focused ? styles.activeIcon : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="chatbubbles-outline"
              size={focused ? size + 4 : size}
              color={color}
              style={focused ? styles.activeIcon : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="person"
              size={focused ? size + 4 : size}
              color={color}
              style={focused ? styles.activeIcon : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="oldPatientIndex"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="person"
              size={focused ? size + 4 : size}
              color={color}
              style={focused ? styles.activeIcon : undefined}
            />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="prescribe"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="person"
              size={focused ? size + 4 : size}
              color={color}
              style={focused ? styles.activeIcon : undefined}
            />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="patientDisplay"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="person"
              size={focused ? size + 4 : size}
              color={color}
              style={focused ? styles.activeIcon : undefined}
            />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    borderTopWidth: 0,
    bottom: 20,
    marginHorizontal: 20,
    elevation: 0,
    height: 60,
    backgroundColor: Platform.select({
      ios: "transparent",
      android: "rgba(10, 36, 99, 0.9)", // Dark semi-transparent blue
      default: "#0A2463",
    }),
    borderRadius: 20,
    overflow: "hidden",
    paddingBottom: Platform.OS === "ios" ? 20 : 0, // Account for iOS home indicator
  },
  activeIcon: {
    transform: [{ scale: 1.1 }],
  },
});
