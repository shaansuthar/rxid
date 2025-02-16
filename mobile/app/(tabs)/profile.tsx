import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database as db } from "../../firebase";
import {
  ProfileInfo,
  MedicalInfo,
  EmergencyContacts,
  initialProfileInfo,
  initialMedicalInfo,
  initialEmergencyContacts,
  DB_PATHS,
} from "../../store/dbInfo";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../../store/auth";

export default function ProfileScreen() {
  const [profileInfo, setProfileInfo] =
    useState<ProfileInfo>(initialProfileInfo);
  const [medicalInfo, setMedicalInfo] =
    useState<MedicalInfo>(initialMedicalInfo);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContacts>(
    initialEmergencyContacts
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(profileInfo);
  const setUserRole = useAuthStore((state) => state.setUserRole);

  useEffect(() => {
    const profileRef = ref(db, DB_PATHS.PROFILE_INFO);
    const medicalRef = ref(db, DB_PATHS.MEDICAL_INFO);
    const emergencyRef = ref(db, DB_PATHS.EMERGENCY_CONTACTS);

    const unsubscribeProfile = onValue(profileRef, (snapshot) => {
      if (snapshot.exists()) {
        setProfileInfo(snapshot.val());
      }
    });

    const unsubscribeMedical = onValue(medicalRef, (snapshot) => {
      if (snapshot.exists()) {
        setMedicalInfo(snapshot.val());
      }
    });

    const unsubscribeEmergency = onValue(emergencyRef, (snapshot) => {
      if (snapshot.exists()) {
        setEmergencyContacts(snapshot.val());
      }
    });

    return () => {
      unsubscribeProfile();
      unsubscribeMedical();
      unsubscribeEmergency();
    };
  }, []);

  const toggleEdit = () => {
    if (isEditing) {
      // Reset edited info when canceling edit
      setEditedInfo(profileInfo);
    }
    setIsEditing(!isEditing);
  };

  const splitName = (fullName: string) => {
    const match = fullName.match(/^(\S+)\s+(.+)$/);
    if (match) {
      return {
        firstName: match[1],
        lastName: match[2],
      };
    }
    return {
      firstName: fullName,
      lastName: "",
    };
  };

  const renderEditableText = (
    value: string | number,
    style: any,
    field?: string
  ) => {
    const stringValue = String(value);
    if (isEditing) {
      return (
        <TextInput
          style={[
            style,
            styles.input,
            // Keep white text for header items when editing
            (field === "name" || field === "email") && {
              color: "#0A2463",
              backgroundColor: "white",
            },
          ]}
          defaultValue={stringValue}
          placeholder={stringValue}
          placeholderTextColor="#8D99AE"
          onChangeText={(text) => {
            if (field === "name") {
              const { firstName, lastName } = splitName(text);
              setEditedInfo((prev) => ({
                ...prev,
                FirstName: firstName,
                LastName: lastName,
              }));
            } else if (field === "email") {
              setEditedInfo((prev) => ({
                ...prev,
                Email: text,
              }));
            }
          }}
        />
      );
    }
    return <Text style={style}>{stringValue}</Text>;
  };

  const renderStaticText = (value: string | number, style: any) => {
    return <Text style={style}>{String(value)}</Text>;
  };

  const handleSignOut = () => {
    setUserRole(null);
    while (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.editButton}>
        <TouchableOpacity onPress={toggleEdit}>
          <Ionicons
            name={isEditing ? "checkmark-circle" : "pencil"}
            size={24}
            color="#0A2463"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.signOutButton}>
        <TouchableOpacity onPress={handleSignOut}>
          <Ionicons name="arrow-back" size={24} color="#0A2463" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            }}
            style={styles.profileImage}
          />
          {renderEditableText(
            `${profileInfo.FirstName} ${profileInfo.LastName}`,
            styles.name,
            "name"
          )}
          {renderEditableText(profileInfo.Email, styles.subtitle, "email")}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                {renderEditableText(profileInfo.DOB, styles.infoValue)}
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Blood Type</Text>
                {renderStaticText(medicalInfo.BloodType, styles.infoValue)}
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Height</Text>
                {renderStaticText(`${medicalInfo.Height} cm`, styles.infoValue)}
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Weight</Text>
                {renderStaticText(`${medicalInfo.Weight} kg`, styles.infoValue)}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.card}>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Ionicons name="person" size={24} color="#0A2463" />
              </View>
              <View style={styles.contactInfo}>
                {renderEditableText(
                  `${emergencyContacts.FirstName} ${emergencyContacts.LastName}`,
                  styles.contactName
                )}
                {renderEditableText(
                  emergencyContacts.Relation,
                  styles.contactRelation
                )}
                {renderEditableText(
                  emergencyContacts.Phone,
                  styles.contactPhone
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allergies</Text>
          <View style={styles.card}>
            <View style={styles.allergyItem}>
              <Ionicons name="alert-circle" size={24} color="#D62828" />
              <Text style={styles.allergyText}>{medicalInfo.Allergies}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Primary Care Provider</Text>
          <View style={styles.card}>
            <View style={styles.doctorInfo}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                }}
                style={styles.doctorImage}
              />
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>{medicalInfo.Doctor}</Text>
              </View>
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
    backgroundColor: "#0A2463",
    padding: 20,
    paddingTop: 60,
  },
  profileHeader: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk-Bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#0A2463",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactIcon: {
    backgroundColor: "#E6EEFF",
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
  },
  contactRelation: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
    marginTop: 2,
  },
  contactPhone: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#247BA0",
    marginTop: 5,
  },
  allergyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  allergyText: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
    marginLeft: 10,
  },
  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#0A2463",
  },
  doctorSpecialty: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Regular",
    color: "#8D99AE",
    marginTop: 2,
  },
  doctorContact: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#247BA0",
    marginTop: 5,
  },
  editButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  signOutButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E6EEFF",
    borderRadius: 4,
    padding: 4,
    backgroundColor: "white",
    minHeight: 24,
    fontSize: 16,
    fontFamily: "SpaceGrotesk-Regular",
  },
});
