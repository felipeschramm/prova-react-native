import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { register } from "../../store/User/userSlice";

const RegisterPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async () => {
    if (email !== "" && password !== "" && name !== "") {
      await dispatch(
        register({ email: email, password: password, name: name })
      );
      navigation.navigate("Auth");
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Fill all the blanks",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: "100%", alignItems: "center", marginTop: 100 }}>
        <View>
          <Text
            style={{
              color: "#707070",
              fontSize: 44,
              fontWeight: "bold",
              marginLeft: 8,
            }}
          >
            TGL
          </Text>
          <View
            style={{
              width: 107,
              height: 7,
              backgroundColor: "#B5C401",
              borderRadius: 6,
              marginBottom: 46,
            }}
          />
        </View>
        <Text style={[styles.greyTitle, { marginBottom: 26 }]}>
          Registration
        </Text>
        <View
          style={{
            width: 306,
            height: 293,
            marginBottom: 38,
            borderWidth: 1,
            borderColor: "#DDDDDD",
            borderRadius: 15,
          }}
        >
          <TextInput
            value={name}
            onChangeText={(input) => setName(input)}
            placeholder="Username"
            style={{
              height: 70,
              fontSize: 15,
              color: "#9D9D9D",
              borderBottomColor: "#EBEBEB",
              borderBottomWidth: 1,
              paddingLeft: 26,
              fontWeight: "bold",
            }}
          />
          <TextInput
            value={email}
            onChangeText={(input) => setEmail(input)}
            placeholder="Email"
            style={{
              height: 70,
              fontSize: 15,
              color: "#9D9D9D",
              borderBottomColor: "#EBEBEB",
              borderBottomWidth: 1,
              paddingLeft: 26,
              fontWeight: "bold",
            }}
          />
          <TextInput
            secureTextEntry
            onChangeText={(input) => setPassword(input)}
            placeholder="Password"
            style={{
              height: 70,
              fontSize: 15,
              color: "#9D9D9D",
              borderBottomColor: "#EBEBEB",
              borderBottomWidth: 1,
              paddingLeft: 26,
              fontWeight: "bold",
            }}
          />
          <TouchableOpacity
            onPress={registerHandler}
            style={{ position: "absolute", bottom: 20, right: 70 }}
          >
            <Text style={{ fontSize: 30, color: "#B5C401" }}>
              Register <Feather name="arrow-right" color="#B5C401" size={30} />
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Auth");
          }}
        >
          <Text style={[styles.greyTitle, { marginBottom: 128 }]}>
            <Feather name="arrow-left" color="#707070" size={35} /> Back
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 15, color: "#707070" }}>
          Copyright 2020 Luby Software
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greyTitle: {
    color: "#707070",
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default RegisterPage;
