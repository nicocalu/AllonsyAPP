import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStore, Mission } from '@/src/store/useStore';

const statusColors = {
  pending: '#f9a825', // yellow
  accepted: '#28a745', // green
  completed: '#082a56', // navy
  cancelled: '#b00020', // red
};

function getStatusStyle(status: Mission['status']) {
  return {
    color: statusColors[status] || '#2f3540',
    fontWeight: 'bold' as const,
  };
}

export default function MyRequestsScreen() {
  const missions = useStore((state) => state.missions);

  const renderItem = ({ item }: { item: Mission }) => (
    <View style={styles.card}>
      <Text style={styles.description}>{item.itemDescription}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.price}>€{item.price.toFixed(2)}</Text>
        <Text style={[styles.status, getStatusStyle(item.status) as any]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      {missions.length > 0 ? (
        <FlatList
          data={missions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven&apos;t published any requests yet.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    padding: 20,
    gap: 16,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d8dbe1',
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  description: {
    fontSize: 16,
    color: '#082a56',
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#082a56',
  },
  status: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#2f3540',
    textAlign: 'center',
  },
});
