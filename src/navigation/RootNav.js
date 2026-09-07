import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const USER_STORAGE_KEY = '@google_meet_cost_user';

const RootNav = () => {
  const [user, setUser] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsRestoring(false);
      }
    };

    restoreUser();
  }, []);

  const handleAuthenticated = async authenticatedUser => {
    await AsyncStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(authenticatedUser),
    );
    setUser(authenticatedUser);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
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
        <MainStack user={user} onLogout={handleLogout} />
      ) : (
        <AuthStack onAuthenticated={handleAuthenticated} />
      )}
    </>
  );
};

export default RootNav;
