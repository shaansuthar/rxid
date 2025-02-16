import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrescriptionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prescriptions</Text>
        <Text style={styles.subtitle}>Active Medications</Text>
      </View>

      <View style={styles.prescriptionList}>
        <View style={styles.prescriptionItem}>
          <View style={styles.medicationIcon}>
            <Ionicons name="pill" size={24} color="#0A2463" />
          </View>
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>Amoxicillin</Text>
            <Text style={styles.medicationDetails}>500mg • 3 times daily</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '60%' }]} />
            </View>
            <Text style={styles.remainingDays}>12 days remaining</Text>
          </View>
        </View>

        <View style={styles.prescriptionItem}>
          <View style={[styles.medicationIcon, { backgroundColor: '#FFE6E6' }]}>
            <Ionicons name="medical" size={24} color="#D62828" />
          </View>
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>Lisinopril</Text>
            <Text style={styles.medicationDetails}>10mg • Once daily</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '80%' }]} />
            </View>
            <Text style={styles.remainingDays}>24 days remaining</Text>
          </View>
        </View>
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
              <Text style={styles.scheduleMedication}>Lisinopril 10mg</Text>
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
    backgroundColor: '#F5F7FF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0A2463',
  },
  title: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk-Bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  prescriptionList: {
    padding: 20,
  },
  prescriptionItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 15,
  },
  medicationIcon: {
    backgroundColor: '#E6EEFF',
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#0A2463',
  },
  medicationDetails: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#8D99AE',
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E6EEFF',
    borderRadius: 2,
    marginTop: 12,
  },
  progress: {
    height: '100%',
    backgroundColor: '#0A2463',
    borderRadius: 2,
  },
  remainingDays: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#8D99AE',
    marginTop: 6,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#0A2463',
    marginBottom: 15,
  },
  scheduleList: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeContainer: {
    width: 80,
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#0A2463',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0A2463',
    marginTop: 8,
  },
  scheduleContent: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#E6EEFF',
    paddingLeft: 15,
  },
  scheduleMedication: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#0A2463',
  },
  scheduleInstruction: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#8D99AE',
    marginTop: 4,
  },
});