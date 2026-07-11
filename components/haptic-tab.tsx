import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

export function HapticTab(props: any) {
  return (
    <Pressable
      {...props}
      onPressIn={(e) => {
        if (Platform.OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(e);
      }}
      style={({ pressed }) => [props.style, pressed && styles.pressed]}
    />
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
