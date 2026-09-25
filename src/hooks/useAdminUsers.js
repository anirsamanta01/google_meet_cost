import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import API from '../apis/api';

const useAdminUsers = currentUserId => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = useCallback(() => {
    let active = true;
    const request = async () => {
      try {
        setLoading(true);
        const {data} = await API.get('/admin/users');
        if (active) {
          setUsers(data.users || []);
          setError('');
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.response?.data?.message || 'Unable to load users.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    request();
    return () => { active = false; };
  }, []);

  useFocusEffect(loadUsers);

  const createUser = async values => {
    try {
      const {data} = await API.post('/admin/users', values);
      setUsers(current => [data.user, ...current]);
      setError('');
      return true;
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create user.');
      return false;
    }
  };

  const updateRole = async (userId, role) => {
    try {
      const {data} = await API.patch(`/admin/users/${userId}/role`, {role});
      setUsers(current => current.map(user => user.id === userId ? data.user : user));
      return true;
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to update user role.');
      return false;
    }
  };

  return {createUser, currentUserId, error, loading, updateRole, users};
};

export default useAdminUsers;
