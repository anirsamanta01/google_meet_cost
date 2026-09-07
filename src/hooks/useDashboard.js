import {useNavigation} from '@react-navigation/native';

const useDashboard = () => {
  const navigation = useNavigation();

  const onCreateMeeting = () => {
    navigation.navigate('create-meeting');
  };

  const onSelectMeeting = meeting => {
    navigation.navigate('meeting-details', {meeting});
  };

  const onViewHistory = () => {
    navigation.navigate('History');
  };

  return {onCreateMeeting, onSelectMeeting, onViewHistory};
}

export default useDashboard;