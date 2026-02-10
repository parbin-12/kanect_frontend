import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import MovingBackground from "../components/MovingBackground";

const BACKEND_URL = "https://kanect-backend.onrender.com/api/questions";

export default function Create() {
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState("General");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      Alert.alert("Error", "Question cannot be empty");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "Password is required");
      return;
    }

    const formData = new FormData();
    formData.append("text", question);
    formData.append("tags", tags);
    formData.append("password", password);

    if (image) {
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "image.jpg",
      });
    }

    try {
      setLoading(true);
      await axios.post(BACKEND_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Post created");
      setQuestion("");
      setTags("General");
      setPassword("");
      setImage(null);
    } catch (err) {
      Alert.alert("Error", "Upload failed or wrong password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MovingBackground />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Post</Text>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚠️ Only admins can upload past questions. Approved questions will appear on the Home page.
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Question"
          placeholderTextColor="#aaa"
          value={question}
          onChangeText={setQuestion}
        />

        <TextInput
          style={styles.input}
          placeholder="Tags (comma separated)"
          placeholderTextColor="#aaa"
          value={tags}
          onChangeText={setTags}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.blueBtn} onPress={pickImage}>
          <Text style={styles.btnText}>
            {image ? "Change Image" : "Pick Image"}
          </Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity
          style={styles.greenBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor:"#E0F2FE",
    opacity:0.80
  },
  title: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  disclaimer: {
    backgroundColor: "black",
    borderLeftWidth: 4,
    borderLeftColor: "#facc15",
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
  },
  disclaimerText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "black",
    borderWidth: 1,
    borderColor: "#444",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  blueBtn: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
  },
  greenBtn: {
    backgroundColor: "orange",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 12,
    borderRadius: 6,
  },
});
