import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { register } from "../../store/User/userSlice";
import { RootState } from "../../store";
import { login } from "../../store/User/userSlice";
import axios from "axios";

const AuthPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    await axios
      .post("http://localhost:3333/sessions", {
        email:'felipecschramm@hotmail.com',
        password: 'felipe123',
      })
      ///////////////////////arrumar emsil:email, password:password
      .then((resp) => {
        dispatch(login({ token: resp.data.token.toString() }));
        navigation.navigate("App");
      })
      .catch((err) => {
        // return ToastAndroid.showWithGravityAndOffset(
        //   "User not registered",
        //   ToastAndroid.SHORT,
        //   ToastAndroid.BOTTOM,
        //   25,
        //   50
        // );
      });
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
          Authentication
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
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 25,
                right: 31,
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
        </View>
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
