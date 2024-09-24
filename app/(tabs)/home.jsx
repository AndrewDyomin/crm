import {
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import { HelloWave } from "@/components/HelloWave";
  import ParallaxScrollView from "@/components/ParallaxScrollView";
  import { ThemedText } from "@/components/ThemedText";
  import { ThemedView } from "@/components/ThemedView";
  import { useDispatch, useSelector } from "react-redux";
  import { logOut } from "@/redux/authSlice";
  import { router } from "expo-router";
  
  export default function Home() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
  
    const onLogout = async () => {
      await dispatch(logOut());
      router.replace('/(tabs)');
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
              <ThemedText type="title">Welcome {user.name}</ThemedText>
              <HelloWave />
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
  