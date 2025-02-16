import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { ref, update } from "firebase/database";
import { database as db } from "../../firebase";
import { DB_PATHS } from "../../store/dbInfo";

export default function PrescribeScreen() {
  const [drugName, setDrugName] = useState("");
  const [dosage, setDosage] = useState("");
  const [amount, setAmount] = useState("");

  const clearInputs = () => {
    setDrugName("");
    setDosage("");
    setAmount("");
  };

  const handlePrescribe = async () => {
    try {
      const prescriptionsRef = ref(db, DB_PATHS.PRESCRIPTIONS);
      await update(prescriptionsRef, {
        DrugName: drugName,
        Dose: dosage,
        Quantity: amount,
      });
      clearInputs();
      router.push("/patientDisplay");
    } catch (error) {
      console.error("Error saving prescription:", error);
    }
  };

  const handleCancel = () => {
    clearInputs();
    router.push("/patientDisplay");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>New Prescription</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Drug Name</Text>
          <TextInput
            style={styles.input}
            value={drugName}
            onChangeText={setDrugName}
            placeholder="Enter drug name"
            placeholderTextColor="#8D99AE"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dosage (in mg)</Text>
          <TextInput
            style={styles.input}
            value={dosage}
            onChangeText={setDosage}
            placeholder="e.g., 500mg"
            placeholderTextColor="#8D99AE"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="e.g., 30 tablets"
            placeholderTextColor="#8D99AE"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.cancelButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.submitButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handlePrescribe}
          >
            <Text style={styles.submitButtonText}>Prescribe</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#0A2463",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#0A2463",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  submitButton: {
    backgroundColor: "#3D90E3",
  },
  cancelButton: {
    backgroundColor: "rgba(10, 36, 99, 0.1)",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Bold",
  },
  cancelButtonText: {
    color: "#0A2463",
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Bold",
  },
});
