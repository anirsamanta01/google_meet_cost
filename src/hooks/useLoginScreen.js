import {useState} from 'react';

const useLoginScreen = (onLogin) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !password) {
      setError('Enter your work email and password.');
      return;
    }

    setError('');
    onLogin?.({email: email.trim()});
  };

  return {email, error, handleSubmit, password, setEmail, setPassword};
}

export default useLoginScreen;
