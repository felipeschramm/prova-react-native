import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";

const AccountPage: React.FC<{ navigation: any }> = ({ navigation }) => {

  return (
    <View style={{ flex: 1 }}>
      <Text>Account</Text>
    </View>
  );
};

export default AccountPage;
