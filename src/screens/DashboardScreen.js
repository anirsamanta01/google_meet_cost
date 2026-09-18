import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useDashboard from '../hooks/useDashboard';
import styles from '../assets/styles';
import ProfileAvatar from '../components/ProfileAvatar';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import CostCard from '../components/CostCard';

const upcomingMeetings = [
  {
    id: '1',
    title: 'Product planning',
    time: '09:30 - 10:15',
    people: 6,
    cost: '$184',
  },
  {
    id: '2',
    title: 'Design critique',
    time: '13:00 - 13:45',
    people: 4,
    cost: '$96',
  },
];

const DashboardScreen = ({ user }) => {
  const { onCreateMeeting, onSelectMeeting, onViewHistory } = useDashboard();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <ScreenHeader
              kicker="TUESDAY, AUGUST 25"
              title={`Good morning, ${user?.name ?? 'there'}.`}
              titleStyle={styles.greeting}
            />
          </View>
          <ProfileAvatar name={user?.name ?? 'User'} />
        </View>
        <CostCard
          variant="dashboard"
          label="TODAY'S MEETING COST"
          value="$1010.50"
          note="12 people across 9 meetings"
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Coming up</Text>
          <Pressable onPress={onViewHistory}>
            <Text style={styles.link}>View history</Text>
          </Pressable>
        </View>
        {upcomingMeetings.map(meeting => (
          <Pressable
            key={meeting.id}
            onPress={() => onSelectMeeting(meeting)}
            style={styles.meeting}
          >
            <View style={styles.timeColumn}>
              <Text style={styles.time}>{meeting.time.split(' ')[0]}</Text>
              <Text style={styles.duration}>45 MIN</Text>
            </View>
            <View style={styles.meetingBody}>
              <Text style={styles.meetingTitle}>{meeting.title}</Text>
              <Text style={styles.meta}>{meeting.people} people</Text>
            </View>
            <Text style={styles.meetingCost}>{meeting.cost}</Text>
          </Pressable>
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
