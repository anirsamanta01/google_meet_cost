import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminPanelScreen from '../screens/AdminPanelScreen';
import AdminFeatureScreen from '../screens/AdminFeatureScreen';
import AdminUsersScreen from '../screens/AdminUsersScreen';
import AdminMeetingsScreen from '../screens/AdminMeetingsScreen';

const Stack = createNativeStackNavigator();

const AdminStack = ({user, onLogout}) => (
  <Stack.Navigator>
    <Stack.Screen name="admin-dashboard" options={{headerShown: false}}>
      {props => (
        <AdminPanelScreen
          {...props}
          onLogout={onLogout}
          user={user}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="admin-feature" options={{headerShown: false}}>
      {props => <AdminFeatureScreen {...props} user={user} />}
    </Stack.Screen>
    <Stack.Screen name="admin-users" options={{headerShown: false}}>
      {props => <AdminUsersScreen {...props} user={user} />}
    </Stack.Screen>
    <Stack.Screen name="admin-meetings" component={AdminMeetingsScreen} options={{headerShown: false}} />
  </Stack.Navigator>
);

export default AdminStack;
