import { View, Text, Button, StyleSheet } from 'react-native';
import { useStore } from '../../src/store/useStore';
import { router } from 'expo-router';

export default function LoginScreen() {
  const login = useStore((state) => state.login);

  const handleLogin = () => {
    login();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Allons-Y</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <Button title="Mock Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 30 },
});