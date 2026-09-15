import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../assets/styles';
import useSignupScreen from './../hooks/useSignupScreen';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

const SignupScreen = () => {
  const {
    state: {
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      error,
      isSubmitting,
      phone,
      setPhone,
    },
    handlers: { handleSubmit, handleLogin },
  } = useSignupScreen();
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
        <Text style={styles.title}>Make every meeting count.</Text>
        <Text style={styles.subtitle}>
          Create your account to understand the people cost behind every
          conversation.
        </Text>

        <View style={styles.form}>
          <FormInput
            autoCapitalize="words"
            label="YOUR NAME"
            onChangeText={setName}
            placeholder="Enter your name"
            value={name}
          />
          <FormInput
            autoComplete="email"
            keyboardType="email-address"
            label="WORK EMAIL"
            onChangeText={setEmail}
            placeholder="you@company.com"
            value={email}
          />
          <FormInput
            autoComplete="tel"
            keyboardType="phone-pad"
            label="PHONE NUMBER"
            onChangeText={setPhone}
            placeholder="123-456-7890"
            value={phone}
          />
          <FormInput
            autoComplete="new-password"
            label="PASSWORD"
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            value={password}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <PrimaryButton
            disabled={isSubmitting}
            onPress={handleSubmit}
            title={isSubmitting ? 'Creating account...' : 'Create account'}
          />
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.forgot}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Built for teams who value their time.</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
