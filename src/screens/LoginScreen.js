import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from '../assets/styles';
import colors from '../assets/colors/colors';
import useLoginScreen from '../hooks/useLoginScreen';

const LoginScreen = ({ onLogin }) => {
  const {email, error, handleSubmit, password, setEmail, setPassword} = useLoginScreen(onLogin);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>M</Text>
        </View>
        <Text style={styles.eyebrow}>MEETWISE</Text>
        <Text style={styles.title}>Meetings that make sense.</Text>
        <Text style={styles.subtitle}>
          Understand the people cost behind every conversation.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>WORK EMAIL</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="you@company.com"
            placeholderTextColor={colors.placeholder}
            style={styles.input}
            value={email}
          />
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.placeholder}
            secureTextEntry
            style={styles.input}
            value={password}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Built for teams who value their time.</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
