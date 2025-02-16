import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/auth';

export default function RoleSelection() {
  const setUserRole = useAuthStore((state) => state.setUserRole);

  const handleRoleSelect = (role: 'patient' | 'doctor') => {
    setUserRole(role);
    router.push('/personal-info');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a...</Text>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleRoleSelect('patient')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="person" size={40} color="#2563eb" />
          </View>
          <Text style={styles.optionTitle}>Patient</Text>
          <Text style={styles.optionDescription}>
            Book appointments and manage your health records
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleRoleSelect('doctor')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="medical" size={40} color="#2563eb" />
          </View>
          <Text style={styles.optionTitle}>Doctor</Text>
          <Text style={styles.optionDescription}>
            Manage appointments and patient records
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 40,
    textAlign: 'center',
  },
  options: {
    gap: 20,
  },
  option: {
    backgroundColor: '#f8fafc',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 24,
  },
});
