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
import { useStore } from '@/src/store/useStore';
import { router } from 'expo-router';

type FieldErrors = {
  username?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPhone(value: string) {
  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly.length >= 8 && digitsOnly.length <= 15;
}

function validateUsername(value: string) {
  const normalized = value.trim();
  if (!normalized) return 'Email or phone is required.';
  if (emailPattern.test(normalized)) return '';
  if (isPhone(normalized)) return '';
  return 'Enter a valid email or phone number.';
}

function validatePassword(value: string) {
  if (!value.trim()) return 'Password is required.';
  if (value.length < 6) return 'Password must be at least 6 characters.';
  return '';
}

export default function LoginScreen() {
  const authenticate = useStore((state) => state.authenticate);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo<FieldErrors>(() => {
    return {
      username: validateUsername(username),
      password: validatePassword(password),
    };
  }, [username, password]);

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = () => {
    setSubmitted(true);
    if (hasErrors) return;

    const normalized = username.trim();
    const email = emailPattern.test(normalized) ? normalized : undefined;
    const phone = isPhone(normalized) ? normalized : undefined;

    authenticate({
      username: normalized,
      email,
      phone,
    });

    router.replace('/');
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.title}>
              Welcome to Allons-Y
            </Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email or phone number</Text>
              <TextInput
                style={[styles.input, submitted && errors.username ? styles.inputError : undefined]}
                value={username}
                onChangeText={setUsername}
                placeholder="you@example.com or +1 555 123 4567"
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="username"
                textContentType="username"
              />
              {submitted && errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, submitted && errors.password ? styles.inputError : undefined]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
              />
              {submitted && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            <Pressable onPress={() => router.push('./forgot-password')}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit}
              disabled={hasErrors}
              style={[styles.submitButton, hasErrors && styles.submitButtonDisabled]}
            >
              <Text style={styles.submitText}>Log In</Text>
            </Pressable>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>New to Allons-y?</Text>
              <Pressable onPress={() => router.push('./signup')}>
                <Text style={styles.linkText}>Sign Up</Text>
              </Pressable>
            </View>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d8dbe1',
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
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
  linkText: {
    color: '#ed176e',
    fontWeight: '600',
    alignSelf: 'flex-start',
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
  footerRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  footerText: {
    color: '#2f3540',
  },
});