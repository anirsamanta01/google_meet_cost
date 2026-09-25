import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import styles from '../assets/styles';

const AdminFeatureScreen = ({navigation, route, user}) => {
  const title = route?.params?.title || 'Admin feature';
  const description = route?.params?.description || 'This admin area is ready for configuration.';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          kicker="ADMINISTRATION"
          onBack={() => navigation.goBack()}
          subtitle={description}
          title={title}
        />
        <View style={styles.preference}>
          <View style={styles.adminAlertBody}>
            <Text style={styles.preferenceTitle}>Signed in as {user?.name || 'Administrator'}</Text>
            <Text style={styles.preferenceNote}>{user?.email || ''}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminFeatureScreen;
