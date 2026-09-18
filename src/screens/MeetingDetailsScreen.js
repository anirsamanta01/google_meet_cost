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
  const selectedMeeting = route?.params?.meeting || {};
  const {error, handleBack, handleEdit, loading, meeting} = useMeetingDetails(
    selectedMeeting.id,
    selectedMeeting,
    onBack,
    onEdit,
  );
  const currentMeeting = meeting || {};
  const attendees = Array.isArray(currentMeeting.attendees)
    ? currentMeeting.attendees
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          kicker="MEETING DETAILS"
          onBack={handleBack}
          title={currentMeeting.title || 'Meeting details'}
        />
        {loading ? <Text style={styles.meta}>Loading meeting details...</Text> : null}
        {!loading && error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.date}>
          {currentMeeting.date || 'Date not available'} |{' '}
          {currentMeeting.time || 'Time not available'}
        </Text>
        <View style={styles.costCard}>
          <Text style={styles.label}>ESTIMATED PEOPLE COST</Text>
          <Text style={styles.cost}>{currentMeeting.cost || '$0'}</Text>
          <Text style={styles.note}>
            Based on attendee roles and{' '}
            {currentMeeting.duration || 'duration not available'}.
          </Text>
        </View>
        <Text style={styles.meta}>
          This meeting is created by {currentMeeting.creator?.name || 'Unknown user'}
        </Text>
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
