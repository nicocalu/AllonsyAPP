import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStore, Delivery } from '../../../src/store/useStore';

export default function DeliveryDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const allDeliveries = useStore((state) => state.allDeliveries);
  const lastDelivery = useStore((state) => state.lastDelivery);

  // Find the delivery by ID or use the last one
  const delivery: Delivery | null = id
    ? allDeliveries.find((d) => d.id === id) || null
    : lastDelivery;

  if (!delivery) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Demande non trouvée</Text>
        <Button title="Retour" onPress={() => router.back()} />
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFA500'; // Orange
      case 'accepted':
        return '#4CAF50'; // Green
      case 'completed':
        return '#2196F3'; // Blue
      case 'cancelled':
        return '#F44336'; // Red
      default:
        return '#999';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'accepted':
        return 'Acceptée';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header with Status */}
      <View style={styles.header}>
        <Text style={styles.title}>Détails de la Demande</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(delivery.status) },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusLabel(delivery.status)}
          </Text>
        </View>
      </View>

      {/* Route Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Trajet</Text>
        <View style={styles.routeBox}>
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>Départ</Text>
            <Text style={styles.locationValue}>{delivery.from}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>Arrivée</Text>
            <Text style={styles.locationValue}>{delivery.to}</Text>
          </View>
        </View>
        <Text style={styles.distanceText}>
          Distance: {delivery.distance} km | Temps estimé: {delivery.estimatedTime} min
        </Text>
      </View>

      {/* Description */}
      {delivery.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Description</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>{delivery.description}</Text>
          </View>
        </View>
      )}

      {/* Financial Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Informations Financières</Text>

        <View style={styles.financialCard}>
          <View style={styles.financialRow}>
            <Text style={styles.financialLabel}>Prix estimé (client)</Text>
            <Text style={styles.financialValue}>{delivery.estimatedPrice.toFixed(2)}€</Text>
          </View>

          <View style={[styles.financialRow, styles.highlightedRow]}>
            <Text style={[styles.financialLabel, styles.highlightedLabel]}>
              Votre gain
            </Text>
            <Text style={[styles.financialValue, styles.highlightedValue]}>
              {delivery.driverEarnings.toFixed(2)}€
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.financialRow}>
            <Text style={styles.financialLabel}>Commission (Allons-Y)</Text>
            <Text style={styles.financialValue}>
              {(delivery.estimatedPrice - delivery.driverEarnings).toFixed(2)}€
            </Text>
          </View>
        </View>
      </View>

      {/* Points & Rewards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⭐ Points & Récompenses</Text>

        <View style={styles.pointsCard}>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Points gagnés</Text>
            <Text style={styles.pointsValue}>{delivery.pointsReward}</Text>
            <Text style={styles.pointsSubText}>+{delivery.pointsReward} pts</Text>
          </View>
          <Text style={styles.pointsInfo}>
            Utilisez vos points pour débloquer des récompenses !
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {delivery.status === 'pending' && (
          <>
            <Button
              title="✓ Accepter la Demande"
              color="#4CAF50"
              onPress={() => {
                // TODO: Implement accept logic
                router.back();
              }}
            />
            <View style={{ height: 10 }} />
            <Button
              title="✗ Refuser"
              color="#F44336"
              onPress={() => router.back()}
            />
          </>
        )}
        {delivery.status !== 'pending' && (
          <Button
            title="← Retour"
            onPress={() => router.back()}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  section: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  routeBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  locationItem: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  distanceText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  descriptionBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  financialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  highlightedRow: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  financialLabel: {
    fontSize: 14,
    color: '#666',
  },
  highlightedLabel: {
    fontWeight: '600',
    color: '#2196F3',
  },
  financialValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  highlightedValue: {
    color: '#2196F3',
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  pointsCard: {
    backgroundColor: '#FFF8DC',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  pointsLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 5,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  pointsSubText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  pointsInfo: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionButtons: {
    marginHorizontal: 15,
    marginTop: 25,
    gap: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 20,
  },
});
