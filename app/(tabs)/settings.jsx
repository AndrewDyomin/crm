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
import { logOut } from "@/redux/authSlice";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SettingsField } from "../../components/SettingsField";

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [current, setCurrent] = useState(true);

  useEffect(() => {
    if (email != user.email || name != user.name) {
      setCurrent(false)
    }
  }, 
  [email, name])

  const onLogout = async () => {
    await dispatch(logOut());
    router.replace("/(tabs)");
  };

  const onSaveChanges = async () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Settings
          </ThemedText>
          <SettingsField item={"name"} value={name} setValue={setName} />
          <SettingsField item={"email"} value={email} setValue={setEmail} />
          <TouchableOpacity
            onPress={onSaveChanges}
            style={current ? [styles.button, styles.hide] : styles.button}
          >
            <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLogout}
            style={[styles.button, styles.logOutBtn]}
          >
            <ThemedText style={styles.buttonText}>Log Out</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    minHeight: "100%",
  },
  title: {
    paddingTop: 10,
    textAlign: "center",
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
  formItem: {
    display: "flex",
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
  logOutBtn: {
    marginTop: "auto",
  },
  hide: {
    display: 'none',
  },
});
