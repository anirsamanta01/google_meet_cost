import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import styles from '../assets/styles';
import useAdminUsers from '../hooks/useAdminUsers';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

const AdminUsersScreen = ({ navigation, user }) => {
  const { createUser, error, loading, updateRole, users } = useAdminUsers(
    user?.id,
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateUser = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      Alert.alert(
        'Missing information',
        'Enter a name, email, phone number, and temporary password.',
      );
      return;
    }

    setIsCreating(true);
    const wasCreated = await createUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    });
    setIsCreating(false);

    if (wasCreated) {
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      Alert.alert(
        'User added',
        'The user can now sign in with the temporary password.',
      );
    }
  };

  const changeRole = account => {
    const nextRole = account.role === 'admin' ? 'user' : 'admin';
    Alert.alert('Change role', `Change ${account.name} to ${nextRole}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', onPress: () => updateRole(account.id, nextRole) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          kicker="ADMINISTRATION"
          onBack={() => navigation.goBack()}
          subtitle="Review accounts and access roles."
          title="Manage users"
        />
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Add user</Text>
          <FormInput
            autoCapitalize="words"
            label="NAME"
            onChangeText={setName}
            placeholder="Employee name"
            value={name}
          />
          <FormInput
            autoCapitalize="none"
            keyboardType="email-address"
            label="WORK EMAIL"
            onChangeText={setEmail}
            placeholder="employee@company.com"
            value={email}
          />
          <FormInput
            keyboardType="phone-pad"
            label="PHONE NUMBER"
            onChangeText={setPhone}
            placeholder="123-456-7890"
            value={phone}
          />
          <FormInput
            autoCapitalize="none"
            label="PASSWORD"
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            secureTextEntry
            value={password}
          />
          <PrimaryButton
            disabled={isCreating}
            onPress={handleCreateUser}
            title={isCreating ? 'Adding user...' : 'Add user'}
          />
        </View>
        {loading ? <Text style={styles.meta}>Loading users...</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!loading && !users.length ? (
          <Text style={styles.meta}>No users found.</Text>
        ) : null}
        {users.map(account => (
          <View key={account.id} style={styles.item}>
            <View style={styles.itemBody}>
              <Text style={styles.itemTitle}>{account.name}</Text>
              <Text style={styles.meta}>{account.email}</Text>
            </View>
            <Pressable
              disabled={account.id === user?.id}
              onPress={() => changeRole(account)}
              style={styles.roleButton}
            >
              <Text style={styles.roleButtonText}>{account.role}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminUsersScreen;
