import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Dimensions, View, Easing } from "react-native";

const { width, height } = Dimensions.get("window");

export default function MovingBackground() {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 60000, 
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 160],
  });

  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 1],
  });

  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Soft Blue Blob */}
      <Animated.View
        style={[
          styles.blobBlue,
          {
            transform: [
              { translateX },
              { translateY },
              { scale },
              { rotate },
            ],
          },
        ]}
      />

      {/* Soft Mint Blob */}
      <Animated.View
        style={[
          styles.blobMint,
          {
            transform: [
              { translateX: Animated.multiply(translateX, -0.8) },
              { translateY: Animated.multiply(translateY, 0.6) },
              { scale },
              { rotate: Animated.multiply(anim, -1).interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                })
              },
            ],
          },
        ]}
      />

      {/* Lavender Glow */}
      <Animated.View
        style={[
          styles.blobLavender,
          {
            transform: [
              { translateX: Animated.multiply(translateX, 0.4) },
              { translateY: Animated.multiply(translateY, -0.5) },
              { scale },
            ],
          },
        ]}
      />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  blobBlue: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: "#bfdbfe",
    opacity: 0.18,
    top: height * 0.15,
    left: -140,
  },

  blobMint: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "#bbf7d0",
    opacity: 0.16,
    top: height * 0.55,
    right: -120,
  },

  blobLavender: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#e9d5ff",
    opacity: 0.14,
    top: height * 0.35,
    left: width * 0.25,
  },
});
