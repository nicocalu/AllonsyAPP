import { View, Text, Button, StyleSheet } from 'react-native';

export default function SenderHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Sender Mode</Text>
      <Text style={styles.description}>Create and manage your delivery requests here.</Text>
      
      <View style={styles.actions}>
        <Button title="Create New Delivery" onPress={() => {}} />
        <View style={{ height: 10 }} />
        <Button title="View My Requests" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, marginTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: 'gray', textAlign: 'center', marginBottom: 30 },
  actions: { width: '100%', paddingHorizontal: 20 }
});