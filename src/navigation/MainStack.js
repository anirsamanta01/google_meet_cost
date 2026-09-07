import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import CreateMeetingScreen from '../screens/CreateMeetingScreen';
import InvitePeopleScreen from '../screens/InvitePeopleScreen';
import MeetingDetailsScreen from '../screens/MeetingDetailsScreen';

const Stack = createNativeStackNavigator();

const MainStack = ({user, onLogout}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main-tabs"
        options={{ headerShown: false }}
      >
        {props => (
          <MainTabs {...props} user={user} onLogout={onLogout} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="create-meeting"
        component={CreateMeetingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="invite-people"
        component={InvitePeopleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="meeting-details"
        component={MeetingDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
