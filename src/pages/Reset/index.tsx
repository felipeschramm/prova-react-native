import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { RootState } from "../../store";
import axios from "axios";
import { Text, TouchableOpacity, View } from "react-native";
import { LineColor, TextTGL } from "../Auth/styles";
import { InputText, ResetText, ViewForm } from "./styles";

const ResetPasswordPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [emailText, setEmailText] = useState("");
  const emailRegistered = useSelector((state: RootState) => state.user.email);

  const sendLinkHandler = async () => {
    if (emailText.length !== 0) {
      if (emailRegistered === emailText) {
        await axios
          .post("http://192.168.0.100:3333/reset", {
            email: emailText,
            redirect_url: "http://www.meusistema.com/resetar_senha",
          })
          .then(() => {
            setEmailText("");
            // toast.success("Link sent to your email");
          })
          .catch((err) => {
            // if (err) return toast.error("Failed to reset password");
          });
      } else {
        // toast.info("Email not registered");
      }
    } else {
      //   toast.info("Email is empty");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 25 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View>
          <TextTGL>TGL</TextTGL>
          <LineColor />
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", flexDirection: "column" }}>
        <ResetText>Reset password</ResetText>

        <ViewForm>
          <InputText
            placeholder="Email"
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
        </ViewForm>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Auth");
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="arrowleft"
            size={35}
            style={{ marginRight: "2" }}
            color="#707070"
          />
          <Text style={{ color: "#707070", fontSize: 35 }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordPage;
