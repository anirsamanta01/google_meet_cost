import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from '../assets/styles';
import useMeetingHistory from '../hooks/useMeetingHistory';

const meetings = [
  {
    title: 'Quarterly review',
    date: 'Aug 22, 2026',
    attendees: 8,
    cost: '$312',
  },
  { title: 'Hiring sync', date: 'Aug 20, 2026', attendees: 5, cost: '$145' },
  {
    title: 'Customer research',
    date: 'Aug 18, 2026',
    attendees: 3,
    cost: '$78',
  },
  {
    title: 'Product planning',
    date: 'Aug 15, 2026',
    attendees: 6,
    cost: '$184',
  },
];

function MeetingHistoryScreen({ onBack, onSelectMeeting }) {
  const {handleSelectMeeting} = useMeetingHistory(onSelectMeeting);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>YOUR ACTIVITY</Text>
        <Text style={styles.title}>Meeting history</Text>
        <Text style={styles.subtitle}>
          A clear view of where your team's time goes.
        </Text>
        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>THIS MONTH</Text>
            <Text style={styles.summaryValue}>$1,840</Text>
          </View>
          <View>
            <Text style={styles.summaryLabel}>MEETINGS</Text>
            <Text style={styles.summaryValue}>18</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>August 2026</Text>
        {meetings.map(meeting => (
          <Pressable
            key={meeting.title}
            onPress={() => handleSelectMeeting(meeting)}
            style={styles.item}
          >
            <View style={styles.itemBody}>
              <Text style={styles.itemTitle}>{meeting.title}</Text>
              <Text style={styles.meta}>
                {meeting.date} | {meeting.attendees} attendees
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
