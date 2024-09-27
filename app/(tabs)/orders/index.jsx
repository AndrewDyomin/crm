import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AnimatedLoader from "react-native-animated-loader";
import { fetchAllOrders } from "../../../redux/ordersSlice";

export default function Orders() {
  const dispatch = useDispatch();
  let dateArray = [];
  let dealersArray = [];

  useEffect(() => {
    dispatch(fetchAllOrders());
    console.log("fetch all orders");
  }, []);

  const AllOrdersArray = useSelector((state) => state.orders.items);
  const isLoading = useSelector((state) => state.orders.isLoading);

  if (AllOrdersArray || AllOrdersArray.length > 0) {
    AllOrdersArray.forEach((order) => {
      if (!dateArray.includes(order.plannedDeadline)) {
        dateArray.push(order.plannedDeadline);
      }
      if (!dealersArray.includes(order.dealer)) {
        dealersArray.push(order.dealer);
      }
    });
  }

  const filteredOrders = AllOrdersArray;

  const SortedOrders = () => {
    console.log(dateArray);
    if (AllOrdersArray || AllOrdersArray.length > 0) {
      
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          My orders
        </ThemedText>
        <AnimatedLoader
          visible={isLoading}
          overlayColor="#00000075"
          animationStyle={styles.lottie}
          speed={1}
        >
          <ThemedText>Loading...</ThemedText>
        </AnimatedLoader>
        <SortedOrders />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    minHeight: "100%",
  },
  title: {
    paddingTop: 10,
    textAlign: "center",
  },
});
