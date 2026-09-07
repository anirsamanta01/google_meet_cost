import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import API from '../apis/api';

const useLoginScreen = onAuthenticated => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    if (!email.trim() || !password) {
      setError('Enter your work email and password.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const { data } = await API.post(
        '/auth/signin',
        {
          email: email.trim(),
          password,
        },
        { timeout: 5000 },
      );
      setEmail('');
      setPassword('');
      Alert.alert(data.message || 'Login successful!');
      await onAuthenticated?.(data.user || data);
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Unable to log in. Please try again.';
      setError(message);
      Alert.alert('Login failed', message);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = () => {
    navigation.navigate('signup');
  };

  return {
    state: {
      email,
      password,
      error,
      setEmail,
      setPassword,
      isSubmitting,
    },
    handlers: {
      handleSignup,
      handleSubmit,
    },
  };
};

export default useLoginScreen;
