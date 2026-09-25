import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenHeader from '../components/ScreenHeader';
import styles from '../assets/styles';
import useAdminMeetings from '../hooks/useAdminMeetings';

const AdminMeetingsScreen = ({ navigation }) => {
  const { deleteMeeting, error, loading, meetings } = useAdminMeetings();

  const confirmDelete = meeting =>
    Alert.alert('Cancel meeting', `Delete "${meeting.title}"?`, [
      { text: 'Keep', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMeeting(meeting.id || meeting._id),
      },
    ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          kicker="ADMINISTRATION"
          onBack={() => navigation.goBack()}
          subtitle="Review and cancel meetings across the workspace."
          title="Manage meetings"
        />
        {loading ? <Text style={styles.meta}>Loading meetings...</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {meetings.map(meeting => (
          <View key={meeting.id || meeting._id} style={styles.item}>
            <View style={styles.itemBody}>
              <Text style={styles.itemTitle}>{meeting.title}</Text>
              <Text style={styles.meta}>
                {meeting.date} | {meeting.time}
              </Text>
              <Text style={styles.meta}>
                Created By {meeting.userId?.name || 'Unknown host'} |{' '}
                {meeting.peopleCount || 0} participants
              </Text>
            </View>
            <View style={styles.adminTeamValueAlign}>
              <Text style={styles.meetingCost}>{meeting.cost || '$0'}</Text>
              <Pressable
                hitSlop={8}
                onPress={() => confirmDelete(meeting)}
                style={styles.deleteButton}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  color={styles.deleteIcon.color}
                />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminMeetingsScreen;
