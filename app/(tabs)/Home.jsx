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
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BlurView } from "expo-blur";

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
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
      <BlurView intensity={30} tint="light" style={styles.card}>
        <Text style={styles.questionText}>{item.text}</Text>

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
              <Animated.View key={i} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </Animated.View>
            ))}
          </View>
        )}
      </BlurView>
    </AnimatedCard>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar barStyle="light-content" />

        <Animated.View style={styles.headerSection}>
          <Text style={styles.header}>KΛNΞCT⚡</Text>
          <Text style={styles.subHeader}>Past Questions</Text>
        </Animated.View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text style={styles.loadingText}>Loading questions...</Text>
          </View>
        ) : (
          <FlatList
            data={questions}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => <QuestionCard item={item} index={index} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#4F46E5"
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
    backgroundColor: "green",
    paddingHorizontal: 16,
    
    
    
  },

  headerSection: {
    marginVertical: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: "800",
    color: "orange",
    
    alignSelf:"center"
  },
  subHeader: {
    fontSize: 14,
    color: "#10B981",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#9CA3AF",
  },

  empty: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    shadowColor: "#000",
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },

  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
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
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4338CA",
  },

  /* MODAL */
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
    zIndex: 10,
  },
  closeText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
