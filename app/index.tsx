import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const logo = require("@/assets/images/guide-book.png");

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
  <View style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.header}>Thailand Travel</Text>
        <Text style={styles.appnameen}>Guide travel in Lampang</Text>
        <ActivityIndicator
          size="large"
          color="#346324"
          style={{ marginTop: 40 }}
        />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#e0dec3",
  },
  appnameen: {
    fontFamily: "Kanit_700Bold",
    fontSize: 20,
    color: "#346324",
  },
  header: {
    fontFamily: "Kanit_700Bold",
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e2d2d",
      marginBottom: 10,
      textAlign: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#ecdf2b",
    alignItems: "center",
    justifyContent: "center",
  },
});