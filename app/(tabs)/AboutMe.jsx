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

export default function AboutMe() {
  const links = [
    { name: "GitHub", url: "https://github.com/parbin-12" },
    { name: "LinkedIn", url: "https://www.linkedin.com/feed/" },
    { name: "LeetCode", url: "https://leetcode.com/u/yadavprabin092/" },
    { name: "CodeChef", url: "https://www.codechef.com/users/pravdev" },
    { name: "Instagram", url: "https://www.instagram.com/praveen_roy2/" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* PROFILE */}
        <View style={styles.profile}>
          <Image
            source={require("../../assets/images/pr.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Praveen Yadav</Text>
          <Text style={styles.role}>React Native Developer</Text>
        </View>

        {/* ABOUT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>
            I am a Computer Science undergraduate passionate about mobile app
            development with React Native. I enjoy building clean and
            user-friendly apps that solve real problems.  

            I am also exploring Artificial Intelligence and Deep Learning,
            learning to integrate AI/ML concepts into mobile apps.  

            Currently, I focus on backend integration, scalable architectures,
            and creating smarter, efficient applications.  

            You can find me online, including on Instagram at{" "}
            <Text style={{ fontWeight: "700" }}>@praveen_roy2</Text>.
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
                <Text style={styles.linkText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", 
    opacity:0.70
  },
  content: {
    padding: 24,
  },

  
  profile: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF", 
  },
  role: {
    fontSize: 14,
    color: "green",
    marginTop: 2,
  },

  
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "maroon",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#E5E7EB", 
  },

  
  linksWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  linkCard: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151", 
    backgroundColor: "#1F2937", 
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
    color: "yellow", 
  },
});
