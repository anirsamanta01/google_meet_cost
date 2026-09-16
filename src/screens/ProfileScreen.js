import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import styles from '../assets/styles';
import useProfile from '../hooks/useProfile';
import ProfileAvatar from '../components/ProfileAvatar';
import ScreenHeader from '../components/ScreenHeader';

const ProfileScreen = ({ user, onLogout }) => {
  const { handleLogout } = useProfile(onLogout);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <ScreenHeader kicker="ACCOUNT" title="Your profile" />
        <View style={styles.profile}>
          <ProfileAvatar name={user?.name} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preference}>
          <View>
            <Text style={styles.preferenceTitle}>Hourly cost defaults</Text>
            <Text style={styles.preferenceNote}>
              Use role rates for meeting estimates
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>
        <View style={styles.preference}>
          <View>
            <Text style={styles.preferenceTitle}>Calendar connection</Text>
            <Text style={styles.preferenceNote}>Google Calendar connected</Text>
          </View>
          <Text style={styles.connected}>ON</Text>
        </View>
        <Pressable onPress={handleLogout} style={styles.logout}>
          <Text style={styles.logoutText}>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
