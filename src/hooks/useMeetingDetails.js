import {useNavigation} from '@react-navigation/native';

const useMeetingDetails=(onBack, onEdit) => {
  const navigation = useNavigation();
  return {
    handleBack: onBack || (() => navigation.goBack()),
    handleEdit: onEdit || (() => navigation.navigate('create-meetings')),
  };
}

export default useMeetingDetails;
