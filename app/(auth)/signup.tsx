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

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(value: string) {
  const normalized = value.trim();
  if (!normalized) return 'Name is required.';
  if (normalized.length < 2) return 'Name must be at least 2 characters.';
  return '';
}

function validateEmail(value: string) {
  const normalized = value.trim();
  if (!normalized) return 'Email is required.';
  if (!emailPattern.test(normalized)) return 'Enter a valid email address.';
  return '';
}

function validatePhone(value: string) {
  const digitsOnly = value.replace(/\D/g, '');
  if (!value.trim()) return 'Phone is required.';
  if (digitsOnly.length < 8 || digitsOnly.length > 15) {
    return 'Phone must contain 8 to 15 digits.';
  }
  return '';
}

function validatePassword(value: string) {
  if (!value.trim()) return 'Password is required.';
  if (value.length < 6) return 'Password must be at least 6 characters.';
  return '';
}

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const errors = useMemo<FieldErrors>(() => {
    return {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
    };
  }, [name, email, phone, password]);

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSignup = () => {
    setSubmitted(true);
    if (hasErrors) return;
    setVerificationSent(true);
  };

  if (verificationSent) {
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We sent a verification email to {email.trim()}. Please verify your account, then return to log in.
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Allons-y with a few details</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input, submitted && errors.name ? styles.inputError : undefined]}
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
                autoCapitalize="words"
                autoComplete="name"
                textContentType="name"
              />
              {submitted && errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, submitted && errors.email ? styles.inputError : undefined]}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
              {submitted && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={[styles.input, submitted && errors.phone ? styles.inputError : undefined]}
                value={phone}
                onChangeText={setPhone}
                placeholder="+1 555 123 4567"
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoComplete="tel"
                textContentType="telephoneNumber"
              />
              {submitted && errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, submitted && errors.password ? styles.inputError : undefined]}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
                textContentType="newPassword"
              />
              {submitted && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            <Pressable
              onPress={handleSignup}
              disabled={hasErrors}
              style={[styles.submitButton, hasErrors && styles.submitButtonDisabled]}
            >
              <Text style={styles.submitText}>Sign Up</Text>
            </Pressable>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Pressable onPress={() => router.replace('/(auth)/login')}>
                <Text style={styles.linkText}>Log In</Text>
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
  footerRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  footerText: {
    color: '#2f3540',
  },
  linkText: {
    color: '#ed176e',
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
});
