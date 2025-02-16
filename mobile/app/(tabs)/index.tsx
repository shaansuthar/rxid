import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#0A2463", "#247BA0"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.greeting}>John Doe</Text>
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
            <Text style={styles.infoLabel}>Current Medications</Text>
            <Text style={styles.infoValue}>Amoxicillin - 500mg</Text>
            <Text style={styles.infoValue}>Lisinopril - 10mg</Text>
          </View>
          <View style={styles.idInfo}>
            <Text style={styles.infoLabel}>Allergies</Text>
            <Text style={styles.infoValue}>Penicillin</Text>
            <Text style={styles.infoValue}>Peanuts</Text>
          </View>
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
});
