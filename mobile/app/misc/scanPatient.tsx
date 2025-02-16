import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

export default function ScanPatientScreen() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]);

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    Animated.loop(pulse).start();
    rotate.start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: pulseAnim }, { rotate: spin }],
            },
          ]}
        >
          <Ionicons name="scan-circle-outline" size={100} color="#0A2463" />
        </Animated.View>
        <Text style={styles.title}>Scan RxID Bracelet</Text>
        <Text style={styles.instructions}>
          Tap your phone against the patient's RxID bracelet to scan their
          information
        </Text>

        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#0A2463",
    marginTop: 20,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
    textAlign: "center",
    maxWidth: "80%",
  },
  cancelButton: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "rgba(10, 36, 99, 0.1)",
  },
  cancelText: {
    color: "#0A2463",
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
  },
});
