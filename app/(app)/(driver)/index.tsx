import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore, Delivery } from '../../../src/store/useStore';

export default function DriverHome() {
  const router = useRouter();
  const setLastDelivery = useStore((state) => state.setLastDelivery);

  // Sample delivery for demonstration
  const sampleDelivery: Delivery = {
    id: '1',
    from: 'Paris, 75001',
    to: 'Boulogne-Billancourt, 92100',
    distance: 5.2,
    estimatedPrice: 25.00,
    driverEarnings: 18.75,
    pointsReward: 50,
    estimatedTime: 25,
    description: 'Colis fragile - Contient des verres. À livrer avant 17h.',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const handleViewDelivery = () => {
    setLastDelivery(sampleDelivery);
    router.push('/(app)/(driver)/delivery-details');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Driver Mode</Text>
      <Text style={styles.description}>Find deliveries and manage your accepted jobs.</Text>
      
      <View style={styles.actions}>
        <Button title="Find Open Deliveries" onPress={handleViewDelivery}  color="#ed176e"/>
        <View style={{ height: 10 }} />
        <Button title="My Active Jobs" onPress={() => {}} color="#ed176e" />
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