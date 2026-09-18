import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import styles from '../assets/styles';
import useMeetingHistory from '../hooks/useMeetingHistory';
import ScreenHeader from '../components/ScreenHeader';
import CostCard from '../components/CostCard';

function MeetingHistoryScreen({ onBack, onSelectMeeting }) {
  const { error, handleSelectMeeting, loading, meetings } =
    useMeetingHistory(onSelectMeeting);

  const totalCost = meetings.reduce((sum, meeting) => {
    const value =
      Number(String(meeting.cost || '$0').replace(/[^\d.]/g, '')) || 0;
    return sum + value;
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          kicker="YOUR ACTIVITY"
          onBack={onBack}
          subtitle="A clear view of where your team's time goes."
          title="Meeting history"
        />
        <CostCard
          variant="summary"
          items={[
            {
              label: 'THIS MONTH',
              value: `$${totalCost.toFixed(2)}`,
            },
            {
              label: 'MEETINGS',
              value: meetings.length,
            },
          ]}
        />

        <Text style={styles.sectionTitle}>Recent meetings</Text>

        {loading && <Text style={styles.meta}>Loading meetings...</Text>}
        {!loading && error ? <Text style={styles.error}>{error}</Text> : null}
        {!loading && !error && meetings.length === 0 ? (
          <Text style={styles.meta}>No meetings found yet.</Text>
        ) : null}

        {!loading &&
          !error &&
          meetings.map(meeting => (
            <Pressable
              key={meeting.id || meeting.title}
              onPress={() => handleSelectMeeting(meeting)}
              style={styles.item}
            >
              <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{meeting.title}</Text>
                <Text style={styles.meta}>
                  {meeting.date} |{' '}
                  {meeting.peopleCount || meeting.attendees?.length || 0}{' '}
                  attendees
                </Text>
              </View>
              <Text style={styles.cost}>{meeting.cost}</Text>
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MeetingHistoryScreen;
