import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DashboardScreen from '../screens/DashboardScreen';
import MeetingHistoryScreen from '../screens/MeetingHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabs = ({user, onLogout}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor: '#D85C3A',
        tabBarInactiveTintColor: '#8B929D',

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },

        tabBarStyle: {
          borderTopColor: '#E1DED7',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },

        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'Profile') {
            iconName = 'account-outline';
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="History"
        component={MeetingHistoryScreen}
      />

      <Tab.Screen
        name="Profile"
      >
        {props => (
          <ProfileScreen {...props} user={user} onLogout={onLogout} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTabs;