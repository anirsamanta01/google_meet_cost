import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from '../assets/styles';
import useMeetingDetails from '../hooks/useMeetingDetails';
import PrimaryButton from '../components/PrimaryButton';
import ProfileAvatar from '../components/ProfileAvatar';
import ScreenHeader from '../components/ScreenHeader';

function MeetingDetailsScreen({route, onBack, onEdit}) {
  const meeting = route?.params?.meeting || {};
  const attendees = Array.isArray(meeting.attendees) ? meeting.attendees : [];
  const {handleBack, handleEdit} = useMeetingDetails(onBack, onEdit);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          kicker="MEETING DETAILS"
          onBack={handleBack}
          title={meeting.title || 'Meeting details'}
        />
        <Text style={styles.date}>
          {meeting.date || 'Date not available'} | {meeting.time || 'Time not available'}
        </Text>
        <View style={styles.costCard}>
          <Text style={styles.label}>ESTIMATED PEOPLE COST</Text>
          <Text style={styles.cost}>{meeting.cost || '$0'}</Text>
          <Text style={styles.note}>
            Based on attendee roles and {meeting.duration || 'duration not available'}.
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Attendees ({attendees.length})</Text>
        {attendees.map((name, index) => (
          <View key={name} style={styles.attendee}>
            <ProfileAvatar
              backgroundColor={index % 2 ? undefined : styles.avatarCool.backgroundColor}
              name={name}
              size={40}
              style={index % 2 ? styles.avatarWarm : undefined}
            />
            <Text style={styles.name}>{name}</Text>
          </View>
        ))}
        <PrimaryButton onPress={handleEdit} title="Edit meeting" />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MeetingDetailsScreen;
