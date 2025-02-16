import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database as db } from "../../firebase";
import { DB_PATHS, Prescriptions } from "../../store/dbInfo";

export default function HomeScreen() {
  const [dbPrescription, setDbPrescription] = useState<Prescriptions | null>(
    null
  );

  const medications = [
    {
      id: "1",
      name: "Amoxicillin",
      dosage: "500",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const prescriptionsRef = ref(db, DB_PATHS.PRESCRIPTIONS);
    const unsubscribe = onValue(prescriptionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.DrugName && data.Dose && data.Quantity) {
          setDbPrescription(data);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#0A2463", "#247BA0"]}
        style={[styles.header, styles.container]}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/(tabs)/doctorHome")}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Text style={[styles.greeting, { marginTop: 30 }]}>John Doe</Text>
        <Text style={styles.subtitle}>Medical ID</Text>

        <View style={styles.idCard}>
          <View style={styles.idHeader}>
            <View>
              <Text style={styles.idTitle}>RxID</Text>
              <Text style={styles.idNumber}>ID: 2024-0001-RXID</Text>
            </View>
            <Image
              source={require("../../assets/images/profile-photo.jpg")}
              style={styles.profilePhoto}
            />
          </View>
          <View style={styles.idInfo}>
            <Text style={styles.infoLabel}>Blood Type</Text>
            <Text style={styles.infoValue}>A+</Text>
          </View>
          <View style={styles.idInfo}>
            <Text style={styles.infoLabel}>Emergency Contact</Text>
            <Text style={styles.infoValue}>Jane Doe</Text>
            <Text style={styles.infoValue}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.idInfo}>
            <Text style={styles.infoLabel}>Allergies</Text>
            <Text style={styles.infoValue}>Penicillin</Text>
            <Text style={styles.infoValue}>Peanuts</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.prescribeButton,
            pressed && styles.prescribeButtonPressed,
          ]}
          onPress={() => router.push("/(tabs)/prescribe")}
        >
          <Text style={styles.prescribeButtonText}>Prescribe</Text>
          <Ionicons name="add-circle" size={24} color="white" />
        </Pressable>

        <Text style={styles.sectionTitle}>Current Medications</Text>
        <View style={styles.medicationList}>
          {medications.map((medication) => (
            <View key={medication.id} style={styles.medicationItem}>
              <View style={styles.medicationIcon}>
                <Ionicons name="medical" size={24} color="#0A2463" />
              </View>
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>
                  {medication.name} - {medication.dosage} mg
                </Text>
              </View>
            </View>
          ))}
          {dbPrescription && (
            <View style={styles.medicationItem}>
              <View style={styles.medicationIcon}>
                <Ionicons name="medical" size={24} color="#0A2463" />
              </View>
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>
                  {dbPrescription.DrugName} - {dbPrescription.Dose} mg
                </Text>
              </View>
            </View>
          )}
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
    color: "white",
    marginTop: 30,
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    padding: 15,
    gap: 15,
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
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#0A2463",
  },
  prescribeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D90E3",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  prescribeButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  prescribeButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "SpaceGrotesk-Bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 60,
    left: 15,
    zIndex: 1,
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    marginLeft: -4,
  },
});
