import {
  StyleSheet,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "@/redux/authSlice";

export default function TabTwoScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onLogin = async () => {
    await dispatch(register({ name, email, password }));
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
            <ThemedText type="subtitle">Register to continue</ThemedText>
            <ThemedView style={[styles.container, styles.form]}>
              <TextInput
                style={styles.input}
                placeholder="name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity onPress={onLogin} style={styles.button}>
                <ThemedText style={styles.buttonText}>Register</ThemedText>
              </TouchableOpacity>
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
    gap: 5,
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
