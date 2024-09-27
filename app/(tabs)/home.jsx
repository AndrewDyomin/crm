import {
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const Drufts = () => {
    if (
      user.description === "administrator" ||
      user.description === "carpenter" ||
      user.description === "upholsterer" ||
      user.description === "seamstress"
    ) {
      return (
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.homeButton}
        >
          <ThemedText>Drufts</ThemedText>
        </TouchableOpacity>
      );
    }
  };

  const Planner = () => {
    if (user.description === "administrator") {
      return (
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.homeButton}
        >
          <ThemedText>Planner</ThemedText>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#8a8475", dark: "#000" }}
      headerImage={
        <Image
          source={require("@/assets/images/msh.png")}
          style={styles.logo}
        />
      }
    >
      <KeyboardAvoidingView
        style={{ flex: 1, padding: 0 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome {user.name}</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.homeContainer}>
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)/orders")}
              style={styles.homeButton}
            >
              <ThemedText>My orders</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={styles.homeButton}
            >
              <ThemedText>Add order</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={styles.homeButton}
            >
              <ThemedText>Archive</ThemedText>
            </TouchableOpacity>
            <Drufts />
            <Planner />
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;
const buttonWidth = screenWidth / 2 - 30;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  homeContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 5,
  },
  logo: {
    height: 280,
    width: 280,
    top: 0,
    left: "50%",
    position: "absolute",
    transform: [{ translateX: -140 }],
  },
  form: {
    marginTop: 30,
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  homeButton: {
    minWidth: buttonWidth,
    minHeight: 90,
    marginBottom: 5,
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "rgba(67, 71, 85, 0.27)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColorSecondary: "rgba(90, 125, 188, 0.05)",
    shadowOffsetSecondary: { width: 0, height: 4 },
    shadowOpacitySecondary: 1,
    shadowRadiusSecondary: 12,
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B88E2F",
    border: "none",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
