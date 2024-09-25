import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
  } from "react-native";

export const SettingsField = ({ item, value, setValue }) => {

  return (
    <ThemedView style={styles.formItem}>
      <ThemedText style={styles.label}>{item.charAt(0).toUpperCase() + item.slice(1)}:</ThemedText>
      <TextInput
        style={styles.input}
        placeholder={item}
        value={value}
        onChangeText={setValue}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
        display: 'flex',
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
