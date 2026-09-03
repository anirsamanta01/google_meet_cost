import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from '../assets/styles';
import useMeetingDetails from '../hooks/useMeetingDetails';

function MeetingDetailsScreen({
  meeting = {},
  attendees = ['Maya Chen', 'Jordan Lee', 'Sam Rivera'],
  onBack,
  onEdit,
}) {
  const {handleBack, handleEdit} = useMeetingDetails(onBack, onEdit);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={handleBack}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Text style={styles.kicker}>MEETING DETAILS</Text>
        <Text style={styles.title}>{meeting.title || 'Product planning'}</Text>
        <Text style={styles.date}>
          {meeting.date || 'Tuesday, August 25, 2026'} |{' '}
          {meeting.time || '09:30 AM'}
        </Text>
        <View style={styles.costCard}>
          <Text style={styles.label}>ESTIMATED PEOPLE COST</Text>
          <Text style={styles.cost}>{meeting.cost || '$184'}</Text>
          <Text style={styles.note}>
            Based on attendee roles and {meeting.duration || '45 minutes'}.
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Attendees ({attendees.length})</Text>
        {attendees.map((name, index) => (
          <View key={name} style={styles.attendee}>
            <View
              style={[
                styles.avatar,
                index % 2 ? styles.avatarWarm : styles.avatarCool,
              ]}
            >
              <Text style={styles.initials}>
                {name
                  .split(' ')
                  .map(part => part[0])
                  .join('')}
              </Text>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.attendeeCost}>
              {index === 0 ? '$52/hr' : '$38/hr'}
            </Text>
          </View>
        ))}
        <Pressable onPress={handleEdit} style={styles.button}>
          <Text style={styles.buttonText}>Edit meeting</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MeetingDetailsScreen;
