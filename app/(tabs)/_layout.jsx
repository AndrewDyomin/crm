import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
  }, [isLoggedIn])
 
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: !isLoggedIn ? '/(tabs)' : null,
            title: "Log In",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "enter" : "enter-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            href: !isLoggedIn ? '/(tabs)/register' : null,
            title: "Register",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "add-circle" : "add-circle-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            href: isLoggedIn ? '/(tabs)/home' : null,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    );
  }
