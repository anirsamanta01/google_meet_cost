import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useDashboard from '../hooks/useDashboard';
import styles from '../assets/styles';
import ProfileAvatar from '../components/ProfileAvatar';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import CostCard from '../components/CostCard';
import DeleteMeetingButton from '../components/DeleteMeetingButton';
import {isUpcomingMeeting, parseMeetingDate} from '../utils/dateUtils';

const DashboardScreen = ({ user }) => {
  const {
    error,
    loading,
    meetings,
    deleteMeeting,
    onCreateMeeting,
    onSelectMeeting,
    onViewHistory,
  } = useDashboard();
  const totalCost = meetings.reduce((sum, meeting) => {
    return sum + (Number(String(meeting.cost || '$0').replace(/[^\d.]/g, '')) || 0);
  }, 0);
  const uniqueAttendees = new Set();
  let legacyPeopleCount = 0;

  meetings.forEach(meeting => {
    if (Array.isArray(meeting.attendees) && meeting.attendees.length > 0) {
      meeting.attendees.forEach(attendee => {
        const attendeeKey =
          typeof attendee === 'object'
            ? attendee.id || attendee.email || attendee.name
            : attendee;

        if (attendeeKey) {
          uniqueAttendees.add(String(attendeeKey).trim().toLowerCase());
        }
      });
    } else {
      legacyPeopleCount += Number(meeting.peopleCount || 0);
    }
  });

  const totalPeople = uniqueAttendees.size + legacyPeopleCount;
  const upcomingMeetings = meetings
    .filter(meeting => isUpcomingMeeting(meeting))
    .sort((firstMeeting, secondMeeting) => {
      return (
        parseMeetingDate(firstMeeting).getTime() -
        parseMeetingDate(secondMeeting).getTime()
      );
    });
  const currentDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  })
    .format(new Date())
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <ScreenHeader
              kicker={currentDate}
              title={`Good morning, ${user?.name ?? 'there'}.`}
              titleStyle={styles.greeting}
            />
          </View>
          <ProfileAvatar name={user?.name ?? 'User'} />
        </View>
        <CostCard
          variant="dashboard"
          label="TOTAL MEETING COST"
          value={`$${totalCost.toFixed(2)}`}
          note={`${totalPeople} people across ${meetings.length} meetings`}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Coming up</Text>
          <Pressable onPress={onViewHistory}>
            <Text style={styles.link}>View history</Text>
          </Pressable>
        </View>
        {loading && <Text style={styles.meta}>Loading upcoming meetings...</Text>}
        {!loading && error ? <Text style={styles.error}>{error}</Text> : null}
        {!loading && !error && upcomingMeetings.length === 0 ? (
          <Text style={styles.meta}>No upcoming meetings found.</Text>
        ) : null}
        {!loading && !error && upcomingMeetings.map(meeting => (
          <View
            key={meeting.id || meeting.title}
            style={styles.meeting}
          >
            <Pressable
              onPress={() => onSelectMeeting(meeting)}
              style={styles.meetingContent}
            >
              <View style={styles.timeColumn}>
                <Text style={styles.time}>{meeting.time || 'No time'}</Text>
                <Text style={styles.duration}>{meeting.duration || 'Meeting'}</Text>
              </View>
              <View style={styles.meetingBody}>
                <Text style={styles.meetingTitle}>{meeting.title}</Text>
                <Text style={styles.meta}>
                  {meeting.peopleCount || meeting.attendees?.length || 0} people
                </Text>
              </View>
            </Pressable>
            <View style={styles.meetingActions}>
              <Text style={styles.meetingCost}>{meeting.cost || '$0'}</Text>
              <DeleteMeetingButton
                meeting={meeting}
                onDelete={deleteMeeting}
              />
            </View>
          </View>
        ))}
        <PrimaryButton
          onPress={onCreateMeeting}
          style={styles.primaryButton}
          textStyle={styles.primaryText}
          title="+ Create a meeting"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
