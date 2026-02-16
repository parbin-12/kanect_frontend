import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text, StatusBar, Dimensions } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/Home"); 
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      
      <Image
        source={require("../assets/images/kkkk.png")} 
        style={{ width, height }}
        resizeMode="contain"
      />

      
      <View style={styles.overlay}>
        <Text style={styles.tagline}>Past Papers & Station Connect, Simplified</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  tagline: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
