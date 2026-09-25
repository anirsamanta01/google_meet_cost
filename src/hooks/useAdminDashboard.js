import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import API from '../apis/api';

const useAdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    meetings: 0,
    totalCost: '$0.00',
    people: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOverview = useCallback(() => {
    let isActive = true;

    const fetchOverview = async () => {
      try {
        setLoading(true);
        const {data} = await API.get('/admin/overview');
        if (isActive) {
          setStats(data.stats || {});
          setRecentUsers(data.recentUsers || []);
          setError('');
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError.response?.data?.message ||
              'Unable to load admin overview.',
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchOverview();
    return () => {
      isActive = false;
    };
  }, []);

  useFocusEffect(loadOverview);

  return {error, loading, recentUsers, stats};
};

export default useAdminDashboard;
