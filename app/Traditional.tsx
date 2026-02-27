import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, FlatList, Image,
  TouchableOpacity, Linking, ActivityIndicator
} from 'react-native';
import { supabase } from '../lib/supabase';
import { Phone, MapPin, Navigation, ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

// กำหนด Interface สำหรับข้อมูล
interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  image_url: string;
  description: string;
}

const RestaurantScreen = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // ฟังก์ชันดึงข้อมูลจาก Supabase
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('traditions')
        .select('*')

      if (error) throw error;
      if (data) setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันโทรออก
  const handleCall = (phoneNumber: string) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  // ฟังก์ชันนำทาง (Google Maps)
  const handleNavigate = (lat: number, lng: number, label: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Restaurant }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

        <View style={styles.addressRow}>
          <MapPin size={14} color="#666" />
          <Text style={styles.addressText} numberOfLines={1}>{item.address}</Text>
        </View>

        <View style={styles.buttonGroup}>
          {/* ปุ่มโทร */}
          <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            onPress={() => handleCall(item.phone)}
          >
            <Phone size={18} color="#FFF" />
            <Text style={styles.buttonText}>โทรออก</Text>
          </TouchableOpacity>

          {/* ปุ่มนำทาง */}
          <TouchableOpacity
            style={[styles.actionButton, styles.navButton]}
            onPress={() => handleNavigate(item.latitude, item.longitude, item.name)}
          >
            <Navigation size={18} color="#FFF" />
            <Text style={styles.buttonText}>นำทาง</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ประเพณีพื้นเมือง</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>ไม่พบข้อมูลร้านอาหาร</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  listContent: { padding: 15 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: '100%', height: 180 },
  infoContainer: { padding: 15 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  description: { fontSize: 14, color: '#666', marginBottom: 10 },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  addressText: { fontSize: 12, color: '#888', marginLeft: 5, flex: 1 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    width: '48%',
  },
  callButton: { backgroundColor: '#28a745' },
  navButton: { backgroundColor: '#007AFF' },
  buttonText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default RestaurantScreen;