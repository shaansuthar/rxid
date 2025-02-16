import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medical History</Text>
        <Text style={styles.subtitle}>Your Health Timeline</Text>
      </View>

      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <View style={styles.timelineDate}>
            <Text style={styles.date}>MAR</Text>
            <Text style={styles.day}>15</Text>
          </View>
          <View style={styles.timelineContent}>
            <View style={styles.eventHeader}>
              <Ionicons name="medical" size={20} color="#0A2463" />
              <Text style={styles.eventType}>Prescription</Text>
            </View>
            <Text style={styles.eventTitle}>Amoxicillin Prescribed</Text>
            <Text style={styles.eventDetails}>
              Dr. Sarah Johnson • General Practice
            </Text>
            <View style={styles.eventMeta}>
              <Text style={styles.metaText}>500mg • 3 times daily • 14 days</Text>
            </View>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.timelineDate}>
            <Text style={styles.date}>MAR</Text>
            <Text style={styles.day}>10</Text>
          </View>
          <View style={styles.timelineContent}>
            <View style={styles.eventHeader}>
              <Ionicons name="fitness" size={20} color="#0A2463" />
              <Text style={styles.eventType}>Vital Signs</Text>
            </View>
            <Text style={styles.eventTitle}>Regular Checkup</Text>
            <Text style={styles.eventDetails}>
              Dr. Sarah Johnson • General Practice
            </Text>
            <View style={styles.vitalsList}>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Blood Pressure</Text>
                <Text style={styles.vitalValue}>120/80</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Heart Rate</Text>
                <Text style={styles.vitalValue}>72 bpm</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Temperature</Text>
                <Text style={styles.vitalValue}>98.6°F</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.timelineDate}>
            <Text style={styles.date}>FEB</Text>
            <Text style={styles.day}>28</Text>
          </View>
          <View style={styles.timelineContent}>
            <View style={styles.eventHeader}>
              <Ionicons name="flask" size={20} color="#0A2463" />
              <Text style={styles.eventType}>Lab Results</Text>
            </View>
            <Text style={styles.eventTitle}>Blood Work Analysis</Text>
            <Text style={styles.eventDetails}>
              Central Lab • Routine Check
            </Text>
            <View style={styles.labResults}>
              <Text style={styles.labText}>All results within normal range</Text>
              <Text style={styles.viewMore}>View Full Report →</Text>
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
  timeline: {
    padding: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDate: {
    width: 60,
    alignItems: 'center',
    marginRight: 15,
  },
  date: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#8D99AE',
  },
  day: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#0A2463',
  },
  timelineContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventType: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#0A2463',
    marginLeft: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#0A2463',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#8D99AE',
  },
  eventMeta: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E6EEFF',
    borderRadius: 8,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#0A2463',
  },
  vitalsList: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalItem: {
    alignItems: 'center',
    flex: 1,
  },
  vitalLabel: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#8D99AE',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#0A2463',
  },
  labResults: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E6EEFF',
    borderRadius: 8,
  },
  labText: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#0A2463',
  },
  viewMore: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#247BA0',
    marginTop: 5,
  },
});