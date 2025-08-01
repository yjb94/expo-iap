import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  initConnection,
  endConnection,
  getAvailablePurchases,
  Purchase,
} from 'expo-iap';

export default function AvailablePurchases() {
  const [connected, setConnected] = useState(false);
  const [availablePurchases, setAvailablePurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initConnection()
      .then(() => {
        setConnected(true);
      })
      .catch((error: any) => {
        console.error('Failed to connect to store:', error);
        Alert.alert('Error', 'Failed to connect to store');
      });

    return () => {
      endConnection();
    };
  }, []);

  const handleGetAvailablePurchases = async () => {
    setLoading(true);
    try {
      const purchases = await getAvailablePurchases();
      setAvailablePurchases(purchases);
    } catch (error) {
      console.error('Error getting available purchases:', error);
      Alert.alert('Error', 'Failed to get available purchases');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Store Connection: {connected ? '✅ Connected' : '❌ Disconnected'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Purchases</Text>

        {availablePurchases.length === 0 ? (
          <Text style={styles.emptyText}>No available purchases found</Text>
        ) : (
          availablePurchases.map((purchase, index) => (
            <View key={purchase.id + index} style={styles.purchaseItem}>
              <View style={styles.purchaseRow}>
                <Text style={styles.label}>Product ID:</Text>
                <Text style={styles.value}>{purchase.id}</Text>
              </View>
              {purchase.transactionDate && (
                <View style={styles.purchaseRow}>
                  <Text style={styles.label}>Date:</Text>
                  <Text style={styles.value}>
                    {new Date(purchase.transactionDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
              {purchase.transactionId && (
                <View style={styles.purchaseRow}>
                  <Text style={styles.label}>Transaction ID:</Text>
                  <Text style={styles.value}>{purchase.transactionId}</Text>
                </View>
              )}
            </View>
          ))
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, !connected && styles.buttonDisabled]}
        onPress={handleGetAvailablePurchases}
        disabled={!connected || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Get Available Purchases</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  purchaseItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  purchaseRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '500',
    width: 120,
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
