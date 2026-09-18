import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import API from '../apis/api';

const employees = [
  { id: '1', name: 'Maya Chen', role: 'Product', initials: 'MC' },
  { id: '2', name: 'Jordan Lee', role: 'Engineering', initials: 'JL' },
  { id: '3', name: 'Sam Rivera', role: 'Design', initials: 'SR' },
  { id: '4', name: 'Priya Shah', role: 'Operations', initials: 'PS' },
  { id: '5', name: 'Alex Johnson', role: 'Marketing', initials: 'AJ' },
];

const getEstimatedCost = count => {
  if (!count) {
    return '$0';
  }

  return `$${count * 42}`;
};

const useInvitePeople = (meeting, onContinue) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = useMemo(
    () =>
      employees.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const toggle = id =>
    setSelected(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id],
    );

  const handleBack = () => navigation.goBack();

  const handleContinue = async () => {
    if (isSubmitting) {
      return;
    }

    const selectedPeople = employees.filter(person =>
      selected.includes(person.id),
    );
    const attendeeNames = selectedPeople.map(person => person.name);
    const finalMeeting = {
      ...(meeting || {}),
      attendees: attendeeNames,
      cost: getEstimatedCost(attendeeNames.length),
      peopleCount: attendeeNames.length,
    };

    setError('');
    setIsSubmitting(true);

    try {
      const { data } = await API.post('/meetings/create-meeting', finalMeeting);
      const savedMeeting = data.meeting || finalMeeting;

      if (onContinue) {
        onContinue(savedMeeting);
        return;
      }

      navigation.navigate('meeting-details', { meeting: savedMeeting });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Unable to save the meeting. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    state: {
      filtered,
      error,
      isSubmitting,
      query,
      selected,
      setQuery,
    },
    handlers: {
      handleBack,
      handleContinue,
      toggle,
    },
  };
};

export default useInvitePeople;
