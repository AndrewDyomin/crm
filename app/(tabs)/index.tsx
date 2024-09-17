import {
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Button,
  ScrollView,
} from "react-native";
import { useState } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    Alert.alert("Credentials", `${login} + ${password}`);
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
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.container}>
            <ThemedText type="subtitle">Log in to continue</ThemedText>
            <ThemedView style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Type your email"
                value={login}
                onChangeText={setLogin}
              />
              <TextInput
                style={styles.input}
                placeholder="Type your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button title="Login" onPress={onLogin} />
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  container: {
    gap: 40,
    marginBottom: 8,
  },
  logo: {
    height: 280,
    width: 280,
    top: 0,
    left: "50%",
    position: "absolute",
    transform: [{ translateX: -140 }],
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 10,
    fontSize: 20,
    marginBottom: 20,
  },
  button: {},
});
