import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { MapPin, Utensils, Coffee, Church, Calendar, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const logo = require("@/assets/images/attraction.jpg");

const HomeScreen = () => {
  const router = useRouter();

  // ข้อมูลเมนู
  const menuItems = [
    { id: 1, title: 'ที่เที่ยวแนะนำ', icon: <MapPin color="#FF5733" size={32} />, screen: 'TouristAttraction', image: require("@/assets/images/attraction1.jpg") },
    { id: 2, title: 'ร้านอาหารเด็ด', icon: <Utensils color="#33FF57" size={32} />, screen: 'Restaurant', image: require("@/assets/images/restaurant.jpg") },
    { id: 3, title: 'ร้านกาแฟ/ขนม', icon: <Coffee color="#3357FF" size={32} />, screen: 'CoffeeShop', image: require("@/assets/images/coffee.jpg") },
    { id: 4, title: 'วัด/ศาสนสถาน', icon: <Church color="#FF33E9" size={32} />, screen: 'Temple', image: require("@/assets/images/temple.jpg") },
    { id: 5, title: 'งานประเพณี', icon: <Calendar color="#FFC300" size={32} />, screen: 'Traditional', image: require("@/assets/images/traditional.jpg") },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header & Hero Section */}
      <View style={styles.heroContainer}>
        <Image
          source={logo}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.welcomeText}>ยินดีต้อนรับสู่</Text>
          <Text style={styles.provinceName}>ไกด์แนะนำจังหวัดลำปาง</Text>
        </View>
      </View>

      {/* 2. Menu Grid */}
      <View style={styles.menuTitleSection}>
        <Text style={styles.menuTitle}>หมวดหมู่แนะนำ</Text>
      </View>

      <View style={styles.gridContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuCard}
            onPress={() => router.push(item.screen as any)}
          >
            {/* ส่วนรูปภาพด้านบนของ Card */}
            <Image source={item.image} style={styles.cardImage} />

            <View style={styles.iconCircle}>
              {item.icon}
            </View>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. Footer / Call to Action */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ค้นหาความสุขในทุกการเดินทาง</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  heroContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  provinceName: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  menuTitleSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
menuCard: {
    width: (width / 2) - 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingBottom: 20,
    marginBottom: 15,
    alignItems: 'center',
    overflow: 'hidden', 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30, 
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#FFFF',
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontStyle: 'italic',
  }
  ,cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 10,
    resizeMode: 'cover',

  },
});

export default HomeScreen;