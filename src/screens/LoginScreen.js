import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import styles from '../assets/styles';
import useLoginScreen from '../hooks/useLoginScreen';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

const LoginScreen = ({ onAuthenticated }) => {
  const {
    state: { email, error, password, setEmail, setPassword, isSubmitting },
    handlers: { handleSignup, handleSubmit },
  } = useLoginScreen(onAuthenticated);

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
          <FormInput
            autoComplete="email"
            keyboardType="email-address"
            label="WORK EMAIL"
            onChangeText={setEmail}
            placeholder="you@company.com"
            value={email}
          />
          <FormInput
            autoComplete="password"
            label="PASSWORD"
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <PrimaryButton onPress={handleSubmit} title={isSubmitting ? 'Signing in...' : 'Sign in'} />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.forgot}>Create an account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Built for teams who value their time.</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
