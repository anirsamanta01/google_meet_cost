const { useState } = require('react');
import { Alert } from 'react-native';
import API from '../apis/api';
import { useNavigation } from '@react-navigation/native';

const useSignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (!name.trim() || !email.trim() || !password || !phone.trim()) {
      setError('Enter your name, work email, password, and phone number.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await API.post(
        '/auth/signup',
        {
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim(),
        },
        { timeout: 5000 },
      );

      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setError('');

      setIsSubmitting(false);
      Alert.alert('Account created successfully! Please log in.');
      navigation.navigate('login');
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Unable to create your account. Please try again.';
      setError(message);
      Alert.alert('Signup failed', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('login');
  };

  return {
    state: {
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      error,
      isSubmitting,
      phone,
      setPhone,
    },
    handlers: {
      handleLogin,
      handleSubmit,
    },
  };
};

export default useSignupScreen;
