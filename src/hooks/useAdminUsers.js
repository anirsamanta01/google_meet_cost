import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import API from '../apis/api';

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const loadUsers = useCallback(() => {
    let isActive = true;

    const request = async () => {
      try {
        setLoading(true);
        const {data} = await API.get('/admin/users');
        if (isActive) {
          setUsers(data.users || []);
          setError('');
        }
      } catch (requestError) {
        if (isActive) {
          setError(requestError.response?.data?.message || 'Unable to load users.');
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    request();
    return () => {
      isActive = false;
    };
  }, []);

  useFocusEffect(loadUsers);

  const addUser = async values => {
    try {
      const {data} = await API.post('/admin/users/create', values);
      setUsers(current => [data.user, ...current]);
      setError('');
      return true;
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create user.');
      return false;
    }
  };

  const handleCreateUser = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      Alert.alert(
        'Missing information',
        'Enter a name, email, phone number, and password.',
      );
      return;
    }

    setIsCreating(true);
    const wasCreated = await addUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    });
    setIsCreating(false);

    if (wasCreated) {
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      Alert.alert('User added', 'The user can now sign in with the password.');
    }
  };

  const updateRole = async (userId, role) => {
    try {
      const {data} = await API.patch(`/admin/users/${userId}/role`, {role});
      setUsers(current =>
        current.map(user => (user.id === userId ? data.user : user)),
      );
      setError('');
      return true;
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to update user role.');
      return false;
    }
  };

  return {
    state: {email, error, isCreating, loading, name, password, phone, users},
    handlers: {
      handleCreateUser,
      setEmail,
      setName,
      setPassword,
      setPhone,
      updateRole,
    },
  };
};

export default useAdminUsers;
