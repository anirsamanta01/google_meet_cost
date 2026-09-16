import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const useCreateMeeting = onContinue => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('Aug 25, 2026');
  const [time, setTime] = useState('09:30 AM');
  const [duration, setDuration] = useState('45 minutes');
  const [error, setError] = useState('');

  const handleBack = () => navigation.goBack();

  const handleContinue = () => {
    const trimmedTitle = title.trim();
    const trimmedDate = date.trim();

    if (trimmedTitle.length < 2) {
      setError('Meeting name must contain at least 2 characters.');
      return;
    }

    if (!trimmedDate) {
      setError('Meeting date is required.');
      return;
    }

    setError('');
    const meeting = {
      title: trimmedTitle,
      date: trimmedDate,
      time: time.trim(),
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
    error,
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
