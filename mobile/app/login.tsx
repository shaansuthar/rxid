import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "../store/auth";
import { ref, onValue } from "firebase/database";
import { database as db } from "../firebase";

export default function SignIn() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const handleSignIn = useCallback(() => {
    setAuthenticated(true);
    router.push("/(tabs)");
  }, [setAuthenticated]);

  const handleCreateAccount = useCallback(() => {
    setAuthenticated(true);
    router.push("/personal-info");
  }, [setAuthenticated]);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#0A2463", "#247BA0"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>RxID</Text>
        <Text style={styles.subtitle}>Revolutionizing Healthcare</Text>
      </LinearGradient>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={handleCreateAccount}
        >
          <Text style={[styles.buttonText, styles.signUpButtonText]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 42,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    padding: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Regular",
  },
  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: "#2563eb",
  },
  signUpButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#2563eb",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "SpaceGrotesk-Medium",
  },
  signUpButtonText: {
    color: "#2563eb",
  },
});
