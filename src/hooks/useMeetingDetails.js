import {useNavigation} from '@react-navigation/native';

const useMeetingDetails=(onBack, onEdit) => {
  const navigation = useNavigation();
  return {
    handleBack: onBack || (() => navigation.goBack()),
    handleEdit: onEdit || (() => navigation.navigate('create-meeting')),
  };
}

export default useMeetingDetails;
