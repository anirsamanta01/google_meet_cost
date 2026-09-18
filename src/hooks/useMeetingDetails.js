import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import API from '../apis/api';

const useMeetingDetails = (meetingId, initialMeeting, onBack, onEdit) => {
  const navigation = useNavigation();
  const [meeting, setMeeting] = useState(initialMeeting || null);
  const [loading, setLoading] = useState(Boolean(meetingId));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!meetingId) {
      setLoading(false);
      return;
    }

    let isActive = true;

    const fetchMeeting = async () => {
      try {
        setLoading(true);
        const {data} = await API.get(`/meetings/view-meeting/${meetingId}`);
        if (isActive) {
          setMeeting(data.meeting);
          setError('');
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError.response?.data?.message ||
              'Unable to load meeting details.',
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchMeeting();

    return () => {
      isActive = false;
    };
  }, [meetingId]);

  return {
    error,
    handleBack: onBack || (() => navigation.goBack()),
    handleEdit: onEdit || (() => navigation.navigate('create-meeting')),
    loading,
    meeting,
  };
};

export default useMeetingDetails;
