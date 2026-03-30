import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
// Importamos el store de tu compañero (asegúrate de que la ruta es correcta)
import { useStore, Delivery } from '../../../src/store/useStore'; 

export default function CreateDelivery() {
  const router = useRouter();
  
  // Traemos las funciones exactas que creó tu compañero
  const addDelivery = useStore((state) => state.addDelivery);
  const setLastDelivery = useStore((state) => state.setLastDelivery);

  // 1. Adaptamos los nombres de los estados para que coincidan con su modelo
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');

  // 2. Ampliamos la estimación para incluir los nuevos campos (distancia y tiempo)
  const [estimation, setEstimation] = useState<{ 
    estimatedPrice: number, 
    driverEarnings: number, 
    pointsReward: number,
    distance: number,
    estimatedTime: number
  } | null>(null);

  const handleCalculate = () => {
    if (!from || !to || !description) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs pour estimer la mission.");
      return;
    }

    // Calculamos los precios como antes
    const mockPrice = Math.floor(Math.random() * 20) + 10;
    const mockDriverEarnings = mockPrice * 0.8;
    const mockPoints = Math.floor(mockPrice * 5);
    
    // Y añadimos simulaciones para los campos nuevos que pide tu compañero
    const mockDistance = Math.floor(Math.random() * 10) + 2; // Distancia entre 2 y 12 km
    const mockTime = mockDistance * 5; // 5 minutos por kilómetro aprox

    setEstimation({
      estimatedPrice: mockPrice,
      driverEarnings: mockDriverEarnings,
      pointsReward: mockPoints,
      distance: mockDistance,
      estimatedTime: mockTime
    });
  };

  const handlePublish = () => {
    if (!estimation) return;

    // 3. Construimos el objeto Delivery EXACTAMENTE como pide la interfaz de tu compañero
    const newDelivery: Delivery = {
      id: Math.random().toString(36).substring(2, 9), // Generamos el ID aquí en lugar del store
      from,
      to,
      description,
      estimatedPrice: estimation.estimatedPrice,
      driverEarnings: estimation.driverEarnings,
      pointsReward: estimation.pointsReward,
      distance: estimation.distance,
      estimatedTime: estimation.estimatedTime,
      status: 'pending', // Estado inicial
      createdAt: new Date().toISOString() // Fecha actual en formato texto
    };

    // 4. Guardamos usando las funciones de tu compañero
    addDelivery(newDelivery);
    setLastDelivery(newDelivery); // Esto es clave para que su pantalla de driver funcione si no hay ID en la URL
    
    Alert.alert("Succès", "Votre demande a été publiée !");
    router.back(); 
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>📦 Créer une livraison</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Adresse de départ :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 12 rue de la Paix, Paris"
          value={from}
          onChangeText={(text) => { setFrom(text); setEstimation(null); }}
        />

        <Text style={styles.label}>Destination :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 45 avenue des Champs-Élysées"
          value={to}
          onChangeText={(text) => { setTo(text); setEstimation(null); }}
        />

        <Text style={styles.label}>Objet à livrer :</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Ex. Un carton moyen, environ 5kg..."
          multiline
          value={description}
          onChangeText={(text) => { setDescription(text); setEstimation(null); }}
        />
      </View>

      {!estimation ? (
        <Button title="Estimer le prix" onPress={handleCalculate} color="#007BFF" />
      ) : (
        <View style={styles.estimationCard}>
          <Text style={styles.estimationTitle}>Transparence Économique</Text>
          <Text style={styles.estimationText}>📏 Distance : <Text style={styles.bold}>{estimation.distance} km</Text> (~{estimation.estimatedTime} min)</Text>
          <Text style={styles.estimationText}>💰 Prix estimé : <Text style={styles.bold}>{estimation.estimatedPrice.toFixed(2)} €</Text></Text>
          <Text style={styles.estimationText}>🚴 Gain du livreur : <Text style={styles.bold}>{estimation.driverEarnings.toFixed(2)} €</Text></Text>
          <Text style={styles.estimationText}>⭐ Points de fidélité : <Text style={styles.bold}>+{estimation.pointsReward} pts</Text></Text>
          
          <View style={{ marginTop: 20 }}>
            <Button title="Publier la mission" onPress={handlePublish} color="#28A745" />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 20 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '600', color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 15, borderRadius: 8, backgroundColor: '#fff' },
  estimationCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#007BFF', marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  estimationTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#007BFF', textAlign: 'center' },
  estimationText: { fontSize: 16, marginBottom: 8 },
  bold: { fontWeight: 'bold' }
});