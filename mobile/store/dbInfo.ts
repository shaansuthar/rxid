import { ref, get, onValue } from 'firebase/database';
import { database as db } from '../firebase';
import { useState, useEffect } from 'react';

// Types
export interface ProfileInfo {
  FirstName: string;
  LastName: string;
  DOB: string;
  Email: string;
  Phone: string;
  Address: string;
}

export interface MedicalInfo {
  Allergies: string;
  BloodType: string;
  Doctor: string;
  Height: string;
  Weight: string;
}

export interface EmergencyContacts {
  FirstName: string;
  LastName: string;
  Phone: string;
  Relation: string;
}

export interface Prescriptions {
  Dose: string;
  DrugName: string;
  Duration: string;
  Frequency: string;
  MG: string;
}

// Initial states
export const initialProfileInfo: ProfileInfo = {
  FirstName: '',
  LastName: '',
  DOB: '',
  Email: '',
  Phone: '',
  Address: '',
};

export const initialMedicalInfo: MedicalInfo = {
  Allergies: '',
  BloodType: '',
  Doctor: '',
  Height: '',
  Weight: '',
};

export const initialEmergencyContacts: EmergencyContacts = {
  FirstName: '',
  LastName: '',
  Phone: '',
  Relation: '',
};

export const initialPrescriptions: Prescriptions = {
  Dose: '',
  DrugName: '',
  Duration: '',
  Frequency: '',
  MG: '',
};

// Database paths
export const DB_PATHS = {
  PROFILE_INFO: 'User/ProfileInfo',
  MEDICAL_INFO: 'User/MedicalInfo',
  EMERGENCY_CONTACTS: 'User/EmergencyContacts',
  PRESCRIPTIONS: 'User/Prescriptions',
} as const;

// Custom hook for managing database state and listeners
export const useDbInfo = () => {
  const [profileInfo, setProfileInfo] =
    useState<ProfileInfo>(initialProfileInfo);
  const [medicalInfo, setMedicalInfo] =
    useState<MedicalInfo>(initialMedicalInfo);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContacts>(
    initialEmergencyContacts
  );
  const [prescriptions, setPrescriptions] =
    useState<Prescriptions>(initialPrescriptions);

  useEffect(() => {
    // Set up Firebase listeners
    const profileRef = ref(db, DB_PATHS.PROFILE_INFO);
    const medicalRef = ref(db, DB_PATHS.MEDICAL_INFO);
    const emergencyRef = ref(db, DB_PATHS.EMERGENCY_CONTACTS);
    const prescriptionsRef = ref(db, DB_PATHS.PRESCRIPTIONS);

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

    const unsubscribePrescriptions = onValue(prescriptionsRef, (snapshot) => {
      if (snapshot.exists()) {
        setPrescriptions(snapshot.val());
      }
    });

    // Cleanup subscriptions
    return () => {
      unsubscribeProfile();
      unsubscribeMedical();
      unsubscribeEmergency();
      unsubscribePrescriptions();
    };
  }, []);

  return {
    profileInfo,
    medicalInfo,
    emergencyContacts,
    prescriptions,
  };
};
