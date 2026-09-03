import {useNavigation} from '@react-navigation/native';

const useMeetingHistory = (onSelectMeeting) => {
  const navigation = useNavigation();
  const handleSelectMeeting = meeting => {
    if (onSelectMeeting) {
      onSelectMeeting(meeting);
      return;
    }
    navigation.navigate('meeting-details', {meeting});
  };

  return {handleSelectMeeting};
}

export default useMeetingHistory;
