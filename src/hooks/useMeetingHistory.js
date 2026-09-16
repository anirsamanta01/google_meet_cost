import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import API from '../apis/api';

const useMeetingHistory = onSelectMeeting => {
  const navigation = useNavigation();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/meetings/list-meetings');
      setMeetings(data.meetings || []);
      setError('');
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || 'Unable to load meeting history.',
      );
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleSelectMeeting = meeting => {
    if (onSelectMeeting) {
      onSelectMeeting(meeting);
      return;
    }
    navigation.navigate('meeting-details', { meeting });
  };

  return { error, fetchMeetings, handleSelectMeeting, loading, meetings };
};

export default useMeetingHistory;
