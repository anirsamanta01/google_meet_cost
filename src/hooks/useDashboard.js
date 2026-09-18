import {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import API from '../apis/api';

const useDashboard = () => {
  const navigation = useNavigation();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMeetings = useCallback(() => {
    let isActive = true;

    const loadMeetings = async () => {
      try {
        setLoading(true);
        const {data} = await API.get('/meetings/list-meetings');
        if (isActive) {
          setMeetings(data.meetings || []);
          setError('');
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError.response?.data?.message ||
              'Unable to load dashboard meetings.',
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadMeetings();

    return () => {
      isActive = false;
    };
  }, []);

  useFocusEffect(fetchMeetings);

  const onCreateMeeting = () => {
    navigation.navigate('create-meeting');
  };

  const onSelectMeeting = meeting => {
    navigation.navigate('meeting-details', {meeting});
  };

  const deleteMeeting = async meetingId => {
    try {
      await API.delete(`/meetings/delete-meeting/${meetingId}`);
      setMeetings(currentMeetings =>
        currentMeetings.filter(meeting => meeting.id !== meetingId),
      );
      setError('');
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Unable to delete the meeting. Please try again.',
      );
    }
  };

  const onViewHistory = () => {
    navigation.navigate('History');
  };

  return {
    error,
    loading,
    meetings,
    deleteMeeting,
    onCreateMeeting,
    onSelectMeeting,
    onViewHistory,
  };
};

export default useDashboard;