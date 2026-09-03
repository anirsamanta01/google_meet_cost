import { useState } from 'react';
import {useNavigation} from '@react-navigation/native';

const useLoginScreen = onLogin => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !password) {
      setError('Enter your work email and password.');
      return;
    }

    setError('');
    onLogin?.({ email: email.trim() });
  };

  const handleSignup = () => {
    navigation.navigate('signup');
  };

  return { email, error, handleSignup, handleSubmit, password, setEmail, setPassword };
};

export default useLoginScreen;
