import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  Modal,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const BACKEND_URL = "https://kanect-backend.onrender.com/api/questions";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      setQuestions(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchQuestions();
    setRefreshing(false);
  }, []);

  const AnimatedCard = ({ children, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        {children}
      </Animated.View>
    );
  };

  const QuestionCard = ({ item, index }) => (
    <AnimatedCard index={index}>
      <View style={styles.card}>
        <Text style={styles.questionText}>📝 {item.text}</Text>

        {item.image && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.imageWrapper}
            onPress={() => setPreviewImage(item.image)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {item.tags && item.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {item.tags.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>🏷️ {tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </AnimatedCard>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* HEADER */}
        <View style={styles.headerSection}>
          <Text style={styles.header}>KΛNΞCT ⚡</Text>
          <Text style={styles.subHeader}>Past Questions Hub</Text>
        </View>

        {/* PURPOSE */}
        <View style={styles.purposeBox}>
          <Text style={styles.purposeTitle}>Why Kanect?</Text>
          <Text style={styles.purposeText}>
            Kanect helps students find past and supplementary exam questions in
            one place and connects students travelling from stations so no one
            feels lost or alone. Questions are uploaded by admins and appear
            here instantly for everyone.
          </Text>
        </View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#000000" />
            <Text style={styles.loadingText}>Loading questions...</Text>
          </View>
        ) : (
          <FlatList
            data={questions}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => <QuestionCard item={item} index={index} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#000000"
              />
            }
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No questions yet 👀</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>

      {/* IMAGE PREVIEW */}
      <Modal
        visible={!!previewImage}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewImage(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setPreviewImage(null)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Image
            source={{ uri: previewImage }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 16,
  },

  headerSection: {
    marginTop: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "900",
    color: "#2563EB",
  },
  subHeader: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  purposeBox: {
    marginTop: 14,
    backgroundColor: "black",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  purposeTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
    marginBottom: 6,
  },
  purposeText: {
    fontSize: 13,
    color: "white",
    lineHeight: 18,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },

  empty: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "red",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 22,
  },

  imageWrapper: {
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
  },

  image: {
    width: "100%",
    aspectRatio: 1.2,
    maxHeight: 300,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },

  tag: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
  modalClose: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  closeText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
