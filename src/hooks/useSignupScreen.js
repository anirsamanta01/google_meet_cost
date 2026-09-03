const { useState } = require('react');
const { useNavigation } = require('@react-navigation/native');

const useSignupScreen = onSignUp => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password) {
      setError('Enter your name, work email, and password.');
      return;
    }

    setError('');
    onSignUp?.({ email: email.trim(), name: name.trim() });
  };

  const handleLogin = () => {
    navigation.navigate('login');
  };

  return {
    handleLogin,
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
  };
};

export default useSignupScreen;
