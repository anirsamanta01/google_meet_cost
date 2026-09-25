import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../assets/styles';
import ProfileAvatar from '../components/ProfileAvatar';
import ScreenHeader from '../components/ScreenHeader';
import useAdminDashboard from '../hooks/useAdminDashboard';
import CostCard from '../components/CostCard';

const adminActions = [
  {title: 'Manage users', description: 'Review users, roles, and account access.', route: 'admin-users'},
  {title: 'Manage meetings', description: 'Create, edit, cancel, and assign meeting hosts.', route: 'admin-meetings'},
  {title: 'Participants and attendance', description: 'View participants and attendance records.'},
  {title: 'Subscriptions and costs', description: 'Manage subscriptions and Google Meet costs.'},
  {title: 'Reports and audit logs', description: 'Review operational reports and audit activity.'},
  {title: 'App settings', description: 'Configure application-wide settings.'},
];

const AdminPanelScreen = ({navigation, onLogout, user}) => {
  const {error, loading, recentUsers, stats} = useAdminDashboard();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <ScreenHeader
              kicker="ADMIN PANEL"
              subtitle="Manage users, meetings, costs, and app operations."
              title="Operations overview"
            />
          </View>
          <ProfileAvatar name={user?.name ?? 'Admin'} size={52} />
        </View>

       <CostCard
          variant="summary"
          items={[
            {
              label: 'THIS MONTH',
              value: `${stats.totalCost}`,
            },
            {
              label: 'MEETINGS',
              value: stats.meetings,
            },
          ]}
        />

        <Text style={styles.sectionTitle}>Administration</Text>
        {adminActions.map(action => (
          <Pressable
            key={action.title}
            onPress={() => navigation.navigate(action.route || 'admin-feature', action)}
            style={styles.preference}
          >
            <View style={styles.adminAlertBody}>
              <Text style={styles.preferenceTitle}>{action.title}</Text>
              <Text style={styles.preferenceNote}>{action.description}</Text>
            </View>
            <MaterialCommunityIcons
              color={styles.chevron.color}
              name="chevron-right"
              size={24}
            />
          </Pressable>
        ))}

        {loading ? <Text style={styles.meta}>Loading admin overview...</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.adminStatsGrid}>
          {[
            {label: 'Users', value: stats.users, highlight: true},
            {label: 'Meetings', value: stats.meetings, highlight: false},
            {label: 'Total cost', value: stats.totalCost, highlight: false},
            {label: 'Unique people', value: stats.people, highlight: true},
          ].map(stat => (
            <View
              key={stat.label}
              style={[
                styles.costCard,
                styles.adminStatCard,
                stat.highlight && styles.adminStatCardHighlight,
              ]}
            >
              <Text style={styles.summaryLabel}>{stat.label}</Text>
              <Text
                style={[
                  styles.summaryValue,
                  styles.adminStatValue,
                  stat.highlight
                    ? styles.adminStatValueHighlight
                    : styles.adminStatValueStandard,
                ]}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.adminSectionSpacing}>
          <Text style={styles.sectionTitle}>Recent users</Text>
          {recentUsers.map(recentUser => (
            <View key={recentUser.id} style={styles.item}>
              <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{recentUser.name}</Text>
                <Text style={styles.meta}>{recentUser.email}</Text>
              </View>
              <View style={styles.adminTeamValueAlign}>
                <Text style={styles.meetingCost}>{recentUser.role}</Text>
              </View>
            </View>
          ))}
        </View>
        <Pressable onPress={onLogout} style={styles.logout}>
          <Text style={styles.logoutText}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminPanelScreen;
