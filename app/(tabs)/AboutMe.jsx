import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AboutMe() {
  const links = [
    { icon: <FontAwesome name="github" size={28} color="#fff" />, url: "https://github.com/parbin-12" },
    { icon: <FontAwesome name="linkedin" size={28} color="#0A66C2" />, url: "https://www.linkedin.com/feed/" },
    { icon: <MaterialCommunityIcons name="leetcode" size={28} color="#FFA116" />, url: "https://leetcode.com/u/yadavprabin092/" },
    { icon: <MaterialCommunityIcons name="code-braces" size={28} color="#BF1E2D" />, url: "https://www.codechef.com/users/pravdev" },
    { icon: <FontAwesome name="instagram" size={28} color="#E1306C" />, url: "https://www.instagram.com/praveen_roy2/" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
      
        <View style={styles.profile}>
          <Image
            source={require("../../assets/images/pr.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Praveen Yadav</Text>
          <Text style={styles.role}>React Native Developer</Text>
        </View>

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>
            I am a CSE undergraduate building mobile apps with React Native.
            Passionate about creating clean, user-friendly apps and exploring AI/ML integration.
          </Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find Me Online</Text>
          <View style={styles.linksWrap}>
            {links.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkCard}
                onPress={() => Linking.openURL(item.url)}
              >
                {item.icon}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F2FE" },
  content: { padding: 24 },
  profile: { alignItems: "center", marginBottom: 20, marginTop: 10 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "700", color: "black" },
  role: { fontSize: 14, color: "#A5B4FC", marginTop: 2 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "orange", marginBottom: 8 },
  aboutText: { fontSize: 14, lineHeight: 20, color: "black" },
  linksWrap: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  linkCard: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
  },
});
