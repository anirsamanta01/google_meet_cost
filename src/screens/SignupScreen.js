import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../assets/styles';
import colors from '../assets/colors/colors';
import useSignupScreen from './../hooks/useSignupScreen';

const SignupScreen = ({onSignUp}) => {
  const {
    handleSubmit,
    handleLogin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
  } = useSignupScreen(onSignUp);
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
          <Text style={styles.label}>YOUR NAME</Text>
          <TextInput
            autoCapitalize="words"
            onChangeText={setName}
            placeholder="Alex Morgan"
            placeholderTextColor={colors.placeholder}
            style={styles.input}
            value={name}
          />
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
            autoComplete="new-password"
            onChangeText={setPassword}
            placeholder="Create a password"
            placeholderTextColor={colors.placeholder}
            secureTextEntry
            style={styles.input}
            value={password}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
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
