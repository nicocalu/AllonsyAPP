import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CreateDelivery() {
  const router = useRouter();

  // 1. États pour la création de la livraison
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  // 2. État pour stocker le résultat du calcul de la mission
  const [estimation, setEstimation] = useState<{ price: number, driverEarnings: number, points: number } | null>(null);

  // Fonction pour calculer l'estimation
  const handleCalculate = () => {
    if (!pickupAddress || !dropoffAddress || !itemDescription) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs pour estimer la mission.");
      return;
    }

    // SIMULATION DU CALCUL : Dans le futur, ceci sera calculé par ton backend
    // basé sur la distance réelle (Google Maps API) et la taille de l'objet.
    const mockPrice = Math.floor(Math.random() * 20) + 10; // Prix aléatoire entre 10 et 30€
    const mockDriverEarnings = mockPrice * 0.8; // Le livreur gagne 80% du prix
    const mockPoints = Math.floor(mockPrice * 5); // 5 points par euro dépensé

    setEstimation({
      price: mockPrice,
      driverEarnings: mockDriverEarnings,
      points: mockPoints
    });
  };

  // Fonction pour publier la demande finale
  const handlePublish = () => {
    if (!estimation) return;

    // Ici, tu connecteras plus tard à ton Zustand store ou ton API
    console.log("Nouvelle mission générée :", {
      pickupAddress,
      dropoffAddress,
      itemDescription,
      financials: estimation
    });
    
    Alert.alert("Succès", "Votre demande a été publiée !");
    router.back(); 
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>📦 Créer une livraison</Text>
      
      {/* SECTION FORMULAIRE */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Adresse de départ :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 12 rue de la Paix, Paris"
          value={pickupAddress}
          onChangeText={(text) => { setPickupAddress(text); setEstimation(null); }}
        />

        <Text style={styles.label}>Destination :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 45 avenue des Champs-Élysées"
          value={dropoffAddress}
          onChangeText={(text) => { setDropoffAddress(text); setEstimation(null); }}
        />

        <Text style={styles.label}>Objet à livrer :</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Ex. Un carton moyen, environ 5kg..."
          multiline
          value={itemDescription}
          onChangeText={(text) => { setItemDescription(text); setEstimation(null); }}
        />
      </View>

      {/* BOUTON D'ESTIMATION */}
      {!estimation ? (
        <Button title="Estimer le prix" onPress={handleCalculate} color="#ed176e" />
      ) : (
        /* SECTION TRANSPARENCE ÉCONOMIQUE */
        <View style={styles.estimationCard}>
          <Text style={styles.estimationTitle}>Transparence Économique</Text>
          <Text style={styles.estimationText}>💰 Prix estimé : <Text style={styles.bold}>{estimation.price.toFixed(2)} €</Text></Text>
          <Text style={styles.estimationText}>🚴 Gain du livreur : <Text style={styles.bold}>{estimation.driverEarnings.toFixed(2)} €</Text></Text>
          <Text style={styles.estimationText}>⭐ Points de fidélité : <Text style={styles.bold}>+{estimation.points} pts</Text></Text>
          
          <View style={{ marginTop: 20 }}>
            <Button title="Publier la mission" onPress={handlePublish} color="#ed176e" />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 20, color: '#082a56' },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '600', color: '#082a56' },
  input: { 
    borderWidth: 1, 
    borderColor: '#bcc3cf', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#111827',
  },
  estimationCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d8dbe1',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  estimationTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#082a56', textAlign: 'center' },
  estimationText: { fontSize: 16, marginBottom: 8, color: '#2f3540' },
  bold: { fontWeight: 'bold' }
});