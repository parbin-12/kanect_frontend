import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const BASE_URL = "https://kanect-backend.onrender.com";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Network() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/station/station-post`);
      setPosts(res.data || []);
    } catch (err) {
      console.log("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!name || !phone) {
      Alert.alert("Required", "Enter Name & Phone");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/station/station-post`, {
        name,
        phone,
        note,
        time: time.toISOString(), 
        createdAt: new Date().toISOString(), 
      });

      setName("");
      setPhone("");
      setNote("");
      fetchPosts();
    } catch (err) {
      Alert.alert("Error", "Post failed");
    }
  };

  const PostCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardMain}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>📞 {item.phone}</Text>
        </View>

        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{formatTime(item.time)}</Text>
          <Text style={styles.dateText}>{formatDate(item.time)}</Text>
        </View>
      </View>

      {item.note ? (
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>{item.note}</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PostCard item={item} />}
        refreshing={loading}
        onRefresh={fetchPosts}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            
            <View style={styles.header}>
              <Text style={styles.title}>Station Connect🛤️</Text>
              <Text style={styles.noteInfo}>
                ⚠️ Posts are temporary and will be automatically deleted after 2 hours.
              </Text>
            </View>

            
            <View style={styles.form}>
              <View style={styles.row}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#666"
                  style={[styles.input, { marginRight: 8 }]}
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  placeholder="Phone"
                  placeholderTextColor="#666"
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <TextInput
                placeholder="Note (optional)"
                placeholderTextColor="#666"
                style={styles.input}
                value={note}
                onChangeText={setNote}
              />

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.timeButtonText}>
                    🕒{" "}
                    {time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={createPost}
                >
                  <Text style={styles.submitBtnText}>Broadcast</Text>
                </TouchableOpacity>
              </View>
            </View>


            {loading && (
              <ActivityIndicator
                color="#2563EB"
                style={{ marginBottom: 20 }}
              />
            )}
          </>
        }
        ListEmptyComponent={
          !loading && (
            <Text style={styles.empty}>
              No one has posted from the station yet.
            </Text>
          )
        }
      />

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          onChange={(e, d) => {
            setShowTimePicker(false);
            if (d) setTime(d);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    
  },

  header: {
    marginTop: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "orange",
    alignSelf:"center"
  },
  subtitle: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  noteInfo: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },

  form: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    backgroundColor: "orange",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "black",
    marginBottom: 10,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeButton: {
    flex: 1,
    backgroundColor: "#2563EB", 
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  timeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#16A34A", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    opacity:.70
  
  },
  cardMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  phone: {
    fontSize: 15,
    color: "white",
    marginTop: 2,
  },

  timeBadge: {
    backgroundColor: "black", 
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 10,
    marginTop: 2,
  },

  noteContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  noteText: {
    fontSize: 13,
    color: "white",
    fontStyle: "bold",
  },

  empty: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 40,
  },
});
