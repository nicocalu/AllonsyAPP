import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SenderHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Sender Mode</Text>
      <Text style={styles.description}>Create and manage your delivery requests here.</Text>
      
      <View style={styles.actions}>
        <Button title="Create New Delivery" onPress={() => {
            router.push('/(app)/(sender)/create-delivery');
        }} color="#ed176e" />
        <View style={{ height: 10 }} />
        <Button title="View My Requests" onPress={() => {}} color="#ed176e" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, marginTop: 50, backgroundColor: '#ffffff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#082a56' },
  description: { fontSize: 16, color: '#2f3540', textAlign: 'center', marginBottom: 30 },
  actions: { width: '100%', paddingHorizontal: 20 }
});