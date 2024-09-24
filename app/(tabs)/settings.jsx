import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

  export default function Settings() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
  
    const onLogout = async () => {
      await dispatch(logOut());
      router.replace('/(tabs)');
    };
  
    return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Welcome {user.name}</ThemedText>
            </ThemedView>
            <TouchableOpacity onPress={onLogout} style={styles.button}>
                <ThemedText style={styles.buttonText}>Log Out</ThemedText>
              </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: '#B88E2F',
        border: 'none',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 20,
      },
  });
  