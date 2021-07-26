import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";

const HomePage: React.FC<{ navigation: any }> = ({ navigation }) => {

  return (
    <View style={{ flex: 1 }}>
      <Text>Home</Text>
    </View>
  );
};

export default HomePage;
