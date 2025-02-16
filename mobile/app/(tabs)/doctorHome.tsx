import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ref, set, onValue } from "firebase/database";
import { database as db } from "../../firebase";

export default function HomeScreen() {
  const patients = [
    {
      id: "1",
      name: "John Doe",
      age: 45,
      nextAppointment: "2024-04-15",
      condition: "Hypertension",
      photo: require("../../assets/images/profile-photo.jpg"),
    },
    {
      id: "2",
      name: "Sarah Smith",
      age: 32,
      nextAppointment: "2024-04-16",
      condition: "Diabetes Type 2",
      photo: require("../../assets/images/profile-photo.jpg"),
    },
    // Add more patients as needed
  ];

  const handleScan = async () => {
    try {
      // Set state to 2
      const stateRef = ref(db, "state");
      await set(stateRef, 2);

      // Navigate to scan screen
      router.push("/misc/scanPatient");

      // Listen for state changes
      const unsubscribe = onValue(stateRef, (snapshot) => {
        const state = snapshot.val();
        if (state === 0) {
          router.push("/(tabs)/patientDisplay");
          // Clean up listener
          unsubscribe();
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#0A2463", "#247BA0"]}
        style={[styles.header, styles.container]}
      >
        <Text style={styles.greeting}>Dr. Doofenshmirtz</Text>
        <Text style={styles.subtitle}>Your Patients</Text>

        <Pressable style={styles.scanButton} onPress={handleScan}>
          <Text style={styles.scanButtonText}>Scan RxID Bracelet</Text>
          <Ionicons name="scan" size={20} color="white" />
        </Pressable>

        <View style={styles.patientsList}>
          {patients.map((patient) => (
            <Pressable
              key={patient.id}
              style={styles.patientCard}
              onPress={() => router.push(`/patientDisplay?id=${patient.id}`)}
            >
              <View style={styles.patientHeader}>
                <Image source={patient.photo} style={styles.patientPhoto} />
                <View style={styles.patientInfo}>
                  <Text style={styles.patientName}>{patient.name}</Text>
                  <Text style={styles.patientAge}>Age: {patient.age}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={24} color="#0A2463" />
                </View>
              </View>
              <View style={styles.patientDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar" size={16} color="#8D99AE" />
                  <Text style={styles.detailText}>
                    Next: {patient.nextAppointment}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="medical" size={16} color="#8D99AE" />
                  <Text style={styles.detailText}>{patient.condition}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
  header: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    minHeight: "100%",
  },
  greeting: {
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
  idCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  idHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  idTitle: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#0A2463",
  },
  idNumber: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#8D99AE",
    marginBottom: 15,
  },
  idInfo: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
  },
  infoValue: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
    marginTop: 2,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#0A2463",
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  actionItem: {
    width: "48%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  actionText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
  },
  medicationList: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
  },
  medicationItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  medicationIcon: {
    backgroundColor: "#E6EEFF",
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
  },
  medicationTime: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
    marginTop: 2,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#0A2463",
  },
  patientsList: {
    marginTop: 20,
    gap: 15,
  },
  patientCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  patientHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0A2463",
  },
  patientInfo: {
    flex: 1,
    marginLeft: 15,
  },
  patientName: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#0A2463",
  },
  patientAge: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
  },
  arrowContainer: {
    padding: 5,
  },
  patientDetails: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
    width: "100%",
  },
  scanButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
  },
});
