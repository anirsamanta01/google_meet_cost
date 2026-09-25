import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import API from '../apis/api';

const useAdminMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMeetings = useCallback(() => {
    let active = true;
    const request = async () => {
      try {
        setLoading(true);
        const {data} = await API.get('/admin/meetings');
        if (active) {
          setMeetings(data.meetings || []);
          setError('');
        }
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || 'Unable to load meetings.');
      } finally {
        if (active) setLoading(false);
      }
    };
    request();
    return () => { active = false; };
  }, []);

  useFocusEffect(loadMeetings);

  const deleteMeeting = async id => {
    try {
      await API.delete(`/admin/meetings/${id}`);
      setMeetings(current => current.filter(meeting => meeting._id !== id && meeting.id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete meeting.');
    }
  };

  return {deleteMeeting, error, loading, meetings};
};

export default useAdminMeetings;
