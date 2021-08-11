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
import axios from "axios";
import { InputText, LineColor, ViewForm } from "./styles";
import { register } from "../../store/User/userSlice";

const RegisterPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const registerHandler = async () => {
    if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      await axios
        .post("http://127.0.0.1:3333/users", {
          username: name,
          email: email,
          password: password,
        })
        .then(async() => {
          setName("");
          setEmail("");
          setPassword("");
          await dispatch(register({email:email, password:password, name:name}))
          ToastAndroid.showWithGravityAndOffset(
            "User created. Go back to login page",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        })
        .catch((err) => {
          ToastAndroid.showWithGravityAndOffset(
            "Try again",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        });
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
          <LineColor />
        </View>
        <Text style={[styles.greyTitle, { marginBottom: 26 }]}>
          Registration
        </Text>
        <ViewForm>
          <InputText
            value={name}
            onChangeText={(input) => setName(input)}
            placeholder="Username"
          />
          <InputText
            value={email}
            onChangeText={(input) => setEmail(input)}
            placeholder="Email"
          />
          <InputText
            value={password}
            secureTextEntry
            onChangeText={(input) => setPassword(input)}
            placeholder="Password"
          />
          <TouchableOpacity
            onPress={registerHandler}
            style={{ position: "absolute", bottom: 20, right: 70 }}
          >
            <Text style={{ fontSize: 30, color: "#B5C401" }}>
              Register <Feather name="arrow-right" color="#B5C401" size={30} />
            </Text>
          </TouchableOpacity>
        </ViewForm>
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
