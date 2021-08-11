import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { InputText, LineColor, TextTGL, ViewForm } from "./styles";
import { login } from "../../store/User/userSlice";

const AuthPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeText, setTypeText] = useState(true);

  const loginHandler = () => {
    axios
      .post("http://192.168.0.100:3333/sessions", {
        email: email,
        password: password,
      })
      .then((resp) => {
        dispatch(login({ token: resp.data.token.token.toString() }));
        navigation.navigate("App");
      })
      .catch((err) => {
        return ToastAndroid.showWithGravityAndOffset(
          "User not found",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: "100%", alignItems: "center", marginTop: 100 }}>
        <View>
          <TextTGL>TGL</TextTGL>
          <LineColor />
        </View>
        <Text style={[styles.greyTitle, { marginBottom: 26 }]}>
          Authentication
        </Text>
        <ViewForm>
          <InputText
            onChangeText={(input) => setEmail(input)}
            placeholder="Email"
          />
          <InputText
            secureTextEntry={typeText}
            onChangeText={(input) => setPassword(input)}
            placeholder="Password"
          />
          <Feather
            name="eye"
            color="#B5C401"
            size={30}
            style={{
              position: "absolute",
              top: 90,
              right: 40,
            }}
            onPress={() => {
              setTypeText((prevState: boolean) => !prevState);
            }}
          />
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 25,
                right: 31,
              }}
              onPress={() => {
                navigation.navigate("Reset");
              }}
            >
              <Text
                style={{
                  color: "#C1C1C1",
                  fontSize: 14,
                }}
              >
                I forgot my password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={loginHandler}
              style={{ position: "absolute", top: 85, right: 80 }}
            >
              <Text style={{ fontSize: 30, color: "#B5C401" }}>
                Log In <Feather name="arrow-right" color="#B5C401" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
        </ViewForm>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={[styles.greyTitle, { marginBottom: 128 }]}>
            Sign Up <Feather name="arrow-right" color="#707070" size={35} />
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

export default AuthPage;
