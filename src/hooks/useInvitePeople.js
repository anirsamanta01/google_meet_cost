import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import API from '../apis/api';

const getInitials = name =>
  String(name || '')
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const getEstimatedCost = count => {
  if (!count) {
    return '$0';
  }

  return `$${count * 42}`;
};

const useInvitePeople = (meeting, onContinue) => {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(true);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isActive = true;
    const loadEmployees = async () => {
      try {
        setIsLoadingPeople(true);
        const {data} = await API.get('/meetings/attendees');
        if (isActive) {
          setEmployees(
            (data.users || []).map(user => ({
              ...user,
              initials: getInitials(user.name),
            })),
          );
          setError('');
        }
      } catch (requestError) {
        if (isActive) {
          setError(requestError.response?.data?.message || 'Unable to load people.');
        }
      } finally {
        if (isActive) setIsLoadingPeople(false);
      }
    };

    loadEmployees();
    return () => {
      isActive = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      employees.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [employees, query],
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
      isLoadingPeople,
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
