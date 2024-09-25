import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "@/redux/authSlice";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(refreshUser());
    }
  }, []); 
 
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
        <Tabs.Screen
          name="settings"
          options={{
            href: isLoggedIn ? '/(tabs)/settings' : null,
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    );
  }
