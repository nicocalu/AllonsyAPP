import { View, Text, Button, StyleSheet } from 'react-native';

export default function DriverHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Driver Mode</Text>
      <Text style={styles.description}>Find deliveries and manage your accepted jobs.</Text>
      
      <View style={styles.actions}>
        <Button title="Find Open Deliveries" onPress={() => {}} />
        <View style={{ height: 10 }} />
        <Button title="My Active Jobs" onPress={() => {}} />
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