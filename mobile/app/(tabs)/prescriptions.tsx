import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { ref, onValue, set } from "firebase/database";
import { database as db } from "../../firebase";
import { LinearGradient } from "expo-linear-gradient";

// Add interface at the top of file
interface Medicine {
  id: number;
  name: string;
  details: string;
}

export default function PrescriptionsScreen() {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [prescriptions, setPrescriptions] = useState<Medicine[]>([]);
  const animation = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(1)).current;

  // Define multiple gradient sets for animation
  const gradientSets = [
    ["#FF5733", "#FFBD33", "#75FF33"],
    ["#33FF57", "#33FFBD", "#3375FF"],
    ["#5733FF", "#FF33BD", "#FF5733"],
  ];

  useEffect(() => {
    const animateGradient = () => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 2,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]).start(() => animateGradient());
    };

    animateGradient();
  }, []);

  useEffect(() => {
    // Pulse text size animation
    const pulseText = () => {
      Animated.sequence([
        Animated.timing(textScale, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulseText());
    };

    pulseText();
  }, []);

  const interpolateColors = (index: number) => {
    return animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        gradientSets[0][index],
        gradientSets[1][index],
        gradientSets[2][index],
      ],
    });
  };

  const animatedColors = [
    interpolateColors(0),
    interpolateColors(1),
    interpolateColors(2),
  ];

  useEffect(() => {
    const prescriptionsRef = ref(db, "prescriptions");

    const unsubscribe = onValue(prescriptionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const prescriptionsData = snapshot.val();
        const prescriptionsList = Object.values(prescriptionsData);
        setPrescriptions(prescriptionsList as Medicine[]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDispense = () => {
    Promise.all([set(ref(db, "state"), 3), set(ref(db, "auth"), true)])
      .then(() => {
        Alert.alert("🤖 Beep boop! Medicine coming right up! Please wait...");
      })
      .catch((error) => {
        Alert.alert(
          "Oops!",
          "The dispenser seems to be taking a coffee break."
        );
      });
  };

  const handlePartyModeDispense = () => {
    Promise.all([set(ref(db, "state"), 4), set(ref(db, "auth"), true)])
      .then(() => {
        Alert.alert(
          "🎉 WOOHOO! Time to party! Medicine incoming with extra sparkles! ✨"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Party Pooper!",
          "The dispenser is too shy to dance right now."
        );
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prescriptions</Text>
        <Text style={styles.subtitle}>Active Medications</Text>
      </View>

      <View style={styles.prescriptionList}>
        {prescriptions.map((med) => (
          <TouchableOpacity
            key={med.id}
            style={[
              styles.prescriptionItem,
              selectedMedicine?.id === med.id && styles.selectedItem,
            ]}
            onPress={() => setSelectedMedicine(med)}
          >
            <View style={styles.medicationIcon}>
              <Ionicons name="medical" size={24} color="#0A2463" />
            </View>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{med.name}</Text>
              <Text style={styles.medicationDetails}>{med.details}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.dispenseButton}
          onPress={handleDispense}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Dispense</Text>
          </View>
        </TouchableOpacity>

        <Animated.View style={styles.partyModeButton}>
          <LinearGradient
            colors={["#FF5733", "#FFBD33", "#75FF33"] as const}
            style={styles.gradientContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={handlePartyModeDispense}
            >
              <Animated.Text
                style={[
                  styles.buttonText,
                  { transform: [{ scale: textScale }] },
                ]}
              >
                Party Mode Dispense
              </Animated.Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        <View style={styles.scheduleList}>
          <View style={styles.scheduleItem}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>8:00 AM</Text>
              <View style={styles.dot} />
            </View>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleMedication}>
                Iron Supplements 500mg
              </Text>
              <Text style={styles.scheduleInstruction}>Take with water</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>2:00 PM</Text>
              <View style={styles.dot} />
            </View>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleMedication}>Amoxicillin 500mg</Text>
              <Text style={styles.scheduleInstruction}>Take with food</Text>
            </View>
          </View>
        </View>
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
    backgroundColor: "#0A2463",
  },
  title: {
    fontSize: 28,
    fontFamily: "SpaceGrotesk-Bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Regular",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  prescriptionList: {
    padding: 20,
  },
  prescriptionItem: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    marginBottom: 15,
  },
  selectedItem: {
    borderColor: "#0A2463",
    borderWidth: 2,
  },
  medicationIcon: {
    backgroundColor: "#E6EEFF",
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
  },
  medicationDetails: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  dispenseButton: {
    backgroundColor: "#0A2463",
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 50, // Ensure consistent height
  },
  partyModeButton: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden", // Ensure gradient stays within borders
  },
  gradientContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    minHeight: 50, // Ensure consistent height
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Bold",
    textAlign: "center",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#0A2463",
    marginBottom: 15,
  },
  scheduleList: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
  },
  scheduleItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timeContainer: {
    width: 80,
    alignItems: "center",
  },
  time: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0A2463",
    marginTop: 8,
  },
  scheduleContent: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#E6EEFF",
    paddingLeft: 15,
  },
  scheduleMedication: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
  },
  scheduleInstruction: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
    marginTop: 4,
  },
});
