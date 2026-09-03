import {useNavigation} from '@react-navigation/native';

const useProfile = (onLogout) => {
  const navigation = useNavigation();
  const handleLogout = onLogout || (() => navigation.navigate('login'));
  return {handleLogout};
}

export default useProfile;
