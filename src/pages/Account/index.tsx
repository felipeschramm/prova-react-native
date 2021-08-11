import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text, TouchableOpacity, View, TextInput, ToastAndroid } from "react-native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { Authentication, SendToken } from "./styles";
import axios from "axios";
import { RootState } from "../../store";
import Header from "../../components/Header";

const AccountPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user);
  const [password, setPassword] = useState("");
  useEffect(() => {
    axios
      .get("http://192.168.0.100:3333/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
        setNameText(resp.data.username);
        setEmailText(resp.data.email);
        setPassword(resp.data.password);
      })
      .catch((err) => {
        console.log("err");
      });
  }, []);
  const [showCard, setShowCard] = useState(true);
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [tokenText, setTokenText] = useState("");
  const [data, setData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", email: "", password: "" });
  const [typeText, setTypeText] = useState(true);
  const [editable, setEditable] = useState(false);

  const sendLinkHandler = async () => {
    setEditable(false);
    if (emailText !== data.email || nameText !== data.username) {
      await axios
        .put(
          "http://192.168.0.100:3333/users",
          {
            username: nameText,
            email: emailText,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(() => {
          return ToastAndroid.showWithGravityAndOffset(
            "Updated",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        })
        .catch((err) => {
          return ToastAndroid.showWithGravityAndOffset(
            "Failed to update user",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        });
    } else {
      return ToastAndroid.showWithGravityAndOffset(
        "Not updated. Field did not changed",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };

  const sendEmailHandler = () => {
    axios
      .post("http://192.168.0.100:3333/reset", {
        email: emailText,
        redirect_url: "http://192.168.0.100:3000/resetPassword",
      })
      .then(() => {
        return ToastAndroid.showWithGravityAndOffset(
          "A token was sent to your email",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
      .catch((err) => {
        return ToastAndroid.showWithGravityAndOffset(
          "Try again",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      });
    setShowCard(false);
  };

  const updatePasswordHandler = () => {
    axios
      .put("http://192.168.0.100:3333/reset", {
        token: tokenText,
        password: passwordText,
      })
      .then(() => {
        setTokenText("");
        setPasswordText("");
        ToastAndroid.showWithGravityAndOffset(
          "Password updated",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        setShowCard(true);
      })
      .catch((err) => {
        return ToastAndroid.showWithGravityAndOffset(
          "Try again",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      });
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 25 }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center", flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: "#707070",
            marginBottom: 26,
          }}
        >
          {showCard ? "Change Username" : "Change Password"}
        </Text>

        {showCard && (
          <>
            <Text
              style={{
                position: "absolute",
                top: 85,
                right: 45,
                zIndex: 20,
                backgroundColor: "#B5C401",
                borderRadius: 15,
                padding: 5,
                width: 40,
                color: "white",
              }}
              onPress={() => {
                setEditable((prevState) => !prevState);
              }}
            >
              {" "}
              Edit
            </Text>
            <View
              style={{
                width: 306,
                height: "auto",
                marginBottom: 38,
                borderWidth: 1,
                borderColor: "#DDDDDD",
                borderRadius: 15,
              }}
            >
              <TextInput
                placeholder="Name"
                value={nameText}
                onChangeText={(input) => setNameText(input)}
                editable={editable}
                style={{
                  height: 50,
                  fontSize: 15,
                  color: "#9D9D9D",
                  borderBottomColor: "#EBEBEB",
                  borderBottomWidth: 1,
                  paddingLeft: 26,
                  fontWeight: "bold",
                  backgroundColor: editable ? "white" : "#EBEBE4",
                }}
              />
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={sendLinkHandler}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#B5C401",
                    paddingVertical: 10,
                  }}
                >
                  Send{" "}
                  <AntDesign
                    name="arrowright"
                    size={30}
                    style={{ marginLeft: "2" }}
                  />
                </Text>
              </TouchableOpacity>
            </View>
            <Authentication
              onPress={() => {
                setShowCard(false);
              }}
            >
              Change password
              <AntDesign
                name="arrowright"
                size={25}
                style={{ marginLeft: "2" }}
              />
            </Authentication>
          </>
        )}

        {!showCard && (
          <>
            <SendToken onPress={sendEmailHandler}>Send token</SendToken>
            <View
              style={{
                width: 306,
                height: "auto",
                marginBottom: 38,
                borderWidth: 1,
                borderColor: "#DDDDDD",
                borderRadius: 15,
              }}
            >
              <TextInput
                placeholder="token"
                value={tokenText}
                onChangeText={(input) => setTokenText(input)}
                style={{
                  height: 50,
                  fontSize: 15,
                  color: "#9D9D9D",
                  borderBottomColor: "#EBEBEB",
                  borderBottomWidth: 1,
                  paddingLeft: 26,
                  fontWeight: "bold",
                }}
              />
              <TextInput
                placeholder="new password"
                secureTextEntry={typeText}
                value={passwordText}
                onChangeText={(input) => setPasswordText(input)}
                style={{
                  height: 50,
                  fontSize: 15,
                  color: "#9D9D9D",
                  borderBottomColor: "#EBEBEB",
                  borderBottomWidth: 1,
                  paddingLeft: 26,
                  fontWeight: "bold",
                }}
              />
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={updatePasswordHandler}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#B5C401",
                    paddingVertical: 10,
                  }}
                >
                  Send{" "}
                  <AntDesign
                    name="arrowright"
                    size={30}
                    style={{ marginLeft: "2" }}
                  />
                </Text>
              </TouchableOpacity>
            </View>

            <Feather
              name="eye"
              color="#B5C401"
              size={30}
              style={{
                position: "absolute",
                top: 130,
                right: 50,
              }}
              onPress={() => {
                setTypeText((prevState: boolean) => !prevState);
              }}
            />

            <Authentication
              onPress={() => {
                setShowCard(true);
              }}
            >
              <AntDesign
                name="arrowleft"
                size={25}
                style={{ marginRight: "2" }}
              />
              Back
            </Authentication>
          </>
        )}
      </View>
    </View>
  );
};

export default AccountPage;
