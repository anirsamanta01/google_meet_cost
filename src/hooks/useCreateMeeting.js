import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const useCreateMeeting = onContinue => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('Aug 25, 2026');
  const [time, setTime] = useState('09:30 AM');
  const [duration, setDuration] = useState('45 minutes');

  const handleBack = () => navigation.goBack();
  const handleContinue = () => {
    const meeting = {
      title: title || 'Untitled meeting',
      date,
      time,
      duration,
    };
    if (onContinue) {
      onContinue(meeting);
      return;
    }
    navigation.navigate('invite-people', { meeting });
  };

  return {
    date,
    duration,
    handleBack,
    handleContinue,
    setDate,
    setDuration,
    setTime,
    setTitle,
    time,
    title,
  };
};

export default useCreateMeeting;
