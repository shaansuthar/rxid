import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth";
import { ref, set, onValue } from "firebase/database";
import { database as db } from "../firebase";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
};

export default function PersonalInfo() {
  const { userRole, setUserInfo } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    specialization: "",
    licenseNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (userRole === "doctor") {
      if (!formData.specialization?.trim()) {
        newErrors.specialization = "Specialization is required";
      }
      if (!formData.licenseNumber?.trim()) {
        newErrors.licenseNumber = "License number is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setUserInfo(formData);

        // Set state to 1
        const stateRef = ref(db, "state");
        await set(stateRef, 1);

        // Navigate to scan screen
        router.push("/misc/registerPatient");

        // Listen for state changes
        const unsubscribe = onValue(stateRef, (snapshot) => {
          const state = snapshot.val();
          if (state === 0) {
            // Route based on userRole
            if (userRole === "patient") {
              router.push("/(tabs)/patientHome");
            } else {
              router.push("/(tabs)/doctorHome");
            }
            // Clean up listener
            unsubscribe();
          }
        });
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } else {
      Alert.alert(
        "Error",
        "Please fix the errors in the form before submitting."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Personal Information</Text>
          <Text style={styles.subtitle}>
            Please fill in your details to complete your profile
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[styles.input, errors.firstName && styles.inputError]}
                value={formData.firstName}
                onChangeText={(text) => {
                  setFormData({ ...formData, firstName: text });
                  if (errors.firstName) {
                    setErrors({ ...errors, firstName: "" });
                  }
                }}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                value={formData.lastName}
                onChangeText={(text) => {
                  setFormData({ ...formData, lastName: text });
                  if (errors.lastName) {
                    setErrors({ ...errors, lastName: "" });
                  }
                }}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[styles.input, errors.phoneNumber && styles.inputError]}
                value={formData.phoneNumber}
                onChangeText={(text) => {
                  setFormData({ ...formData, phoneNumber: text });
                  if (errors.phoneNumber) {
                    setErrors({ ...errors, phoneNumber: "" });
                  }
                }}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={[styles.input, errors.dateOfBirth && styles.inputError]}
                value={formData.dateOfBirth}
                onChangeText={(text) => {
                  setFormData({ ...formData, dateOfBirth: text });
                  if (errors.dateOfBirth) {
                    setErrors({ ...errors, dateOfBirth: "" });
                  }
                }}
                placeholder="YYYY-MM-DD"
              />
              {errors.dateOfBirth && (
                <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.multilineInput,
                  errors.address && styles.inputError,
                ]}
                value={formData.address}
                onChangeText={(text) => {
                  setFormData({ ...formData, address: text });
                  if (errors.address) {
                    setErrors({ ...errors, address: "" });
                  }
                }}
                placeholder="Enter your address"
                multiline
                numberOfLines={3}
              />
              {errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}
            </View>

            {userRole === "doctor" && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Specialization</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.specialization && styles.inputError,
                    ]}
                    value={formData.specialization}
                    onChangeText={(text) => {
                      setFormData({ ...formData, specialization: text });
                      if (errors.specialization) {
                        setErrors({ ...errors, specialization: "" });
                      }
                    }}
                    placeholder="Enter your specialization"
                  />
                  {errors.specialization && (
                    <Text style={styles.errorText}>
                      {errors.specialization}
                    </Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>License Number</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.licenseNumber && styles.inputError,
                    ]}
                    value={formData.licenseNumber}
                    onChangeText={(text) => {
                      setFormData({ ...formData, licenseNumber: text });
                      if (errors.licenseNumber) {
                        setErrors({ ...errors, licenseNumber: "" });
                      }
                    }}
                    placeholder="Enter your license number"
                  />
                  {errors.licenseNumber && (
                    <Text style={styles.errorText}>{errors.licenseNumber}</Text>
                  )}
                </View>
              </>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Complete Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#6b7280",
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#374151",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
});
