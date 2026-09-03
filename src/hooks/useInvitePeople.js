import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const employees = [
  { id: '1', name: 'Maya Chen', role: 'Product', initials: 'MC' },
  { id: '2', name: 'Jordan Lee', role: 'Engineering', initials: 'JL' },
  { id: '3', name: 'Sam Rivera', role: 'Design', initials: 'SR' },
  { id: '4', name: 'Priya Shah', role: 'Operations', initials: 'PS' },
];

const useInvitePeople = (meeting, onContinue) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
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
  const handleContinue = () => {
    if (onContinue) {
      onContinue(selected);
      return;
    }
    navigation.navigate('meeting-details', { meeting, attendees: selected });
  };

  return {
    filtered,
    handleBack,
    handleContinue,
    query,
    selected,
    setQuery,
    toggle,
  };
}

export default useInvitePeople;
