import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import API, {TOKEN_STORAGE_KEY} from '../apis/api';
import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import MainStack from './MainStack';

const USER_STORAGE_KEY = '@google_meet_cost_user';

const RootNav = () => {
  const [user, setUser] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

        if (storedToken) {
          API.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
        }

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        } else {
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
          await API.clearAuthToken();
        }
      } catch (error) {
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
        delete API.defaults.headers.common.Authorization;
      } finally {
        setIsRestoring(false);
      }
    };

    restoreUser();
  }, []);

  const handleAuthenticated = async authData => {
    const authenticatedUser = authData?.user || authData || null;
    const authToken = authData?.token || null;

    if (authToken) {
      await API.setAuthToken(authToken);
    } else {
      await API.clearAuthToken();
    }

    await AsyncStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(authenticatedUser),
    );
    setUser(authenticatedUser);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    await API.clearAuthToken();
    setUser(null);
  };

  if (isRestoring) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      {user ? (
        user.role?.toLowerCase() === 'admin' ? (
          <AdminStack user={user} onLogout={handleLogout} />
        ) : (
          <MainStack user={user} onLogout={handleLogout} />
        )
      ) : (
        <AuthStack onAuthenticated={handleAuthenticated} />
      )}
    </>
  );
};

export default RootNav;
