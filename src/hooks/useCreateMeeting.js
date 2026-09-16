import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const formatDate = value =>
  value.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatTime = value =>
  value.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

const useCreateMeeting = onContinue => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(() => {
    const initialTime = new Date();
    initialTime.setHours(9, 30, 0, 0);
    return initialTime;
  });
  const [duration, setDuration] = useState('45 minutes');
  const [error, setError] = useState('');

  const date = formatDate(dateValue);
  const time = formatTime(timeValue);

  const handleBack = () => navigation.goBack();

  const handleContinue = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 2) {
      setError('Meeting name must contain at least 2 characters.');
      return;
    }

    setError('');
    const meeting = {
      title: trimmedTitle,
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
    state: {
      date,
      dateValue,
      duration,
      error,
      setDuration,
      setTitle,
      time,
      timeValue,
      title,
    },
    handlers: {
      handleBack,
      handleContinue,
      handleDateChange: (_event, selectedDate) => {
        if (selectedDate) {
          setDateValue(selectedDate);
        }
      },
      handleTimeChange: (_event, selectedTime) => {
        if (selectedTime) {
          setTimeValue(selectedTime);
        }
      },
    },
  };
};

export default useCreateMeeting;
