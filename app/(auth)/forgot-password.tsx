import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string) {
  const normalized = value.trim();
  if (!normalized) return 'Email is required.';
  if (!emailPattern.test(normalized)) return 'Enter a valid email address.';
  return '';
}

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const error = useMemo(() => validateEmail(email), [email]);
  const hasError = Boolean(error);

  const handleReset = () => {
    setSubmitted(true);
    if (hasError) return;
    setResetSent(true);
  };

  if (resetSent) {
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            A password reset email has been sent to {email.trim()}. Follow the instructions, then return to log in.
          </Text>
          <Pressable style={styles.submitButton} onPress={() => router.replace('/(auth)/login')}>
            <Text style={styles.submitText}>Back to Login</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a password reset link.</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, submitted && hasError ? styles.inputError : undefined]}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
              {submitted && hasError ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <Pressable
              onPress={handleReset}
              disabled={hasError}
              style={[styles.submitButton, hasError && styles.submitButtonDisabled]}
            >
              <Text style={styles.submitText}>Send Reset Email</Text>
            </Pressable>

            <Pressable onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.linkText}>Back to Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d8dbe1',
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '700',
    color: '#082a56',
  },
  subtitle: {
    color: '#2f3540',
    marginBottom: 6,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontWeight: '600',
    color: '#082a56',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bcc3cf',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: '#ffffff',
    color: '#111827',
  },
  inputError: {
    borderColor: '#b00020',
  },
  errorText: {
    color: '#b00020',
    fontSize: 13,
    lineHeight: 16,
  },
  submitButton: {
    marginTop: 6,
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#ed176e',
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  linkText: {
    color: '#ed176e',
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
});
