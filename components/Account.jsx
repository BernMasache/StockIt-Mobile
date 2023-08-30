import React from "react";

import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text>Settings</Text>
    </View>
  );
}
