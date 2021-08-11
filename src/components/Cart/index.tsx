import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/";
import BetInCart from "../BetInCart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Game, saveGame } from "../../store/Games/gamesSlice";
import axios from "axios";
import { clear } from "../../store/Cart/cartSlice";
import { clearGameCart } from "../../store/InfoCart/infoCartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Cart: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.info.totalPrice);
  const totalQtt = useAppSelector((state) => state.info.totalQtt);
  const cartfromStore: Array<Game> = useAppSelector((state) => state.cart.bets);
  console.log('chegou no cart:'+ cartfromStore)
  const token = useSelector((state: RootState) => state.user.token);

  const sendEmail = async () => {
    await axios
      .get("http://192.168.0.100:3333/send", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log('ok deu certo');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveHandler = () => {
    if (totalPrice >= 30) {
      dispatch(saveGame(cartfromStore));

      sendEmail();
      dispatch(clear());
      dispatch(clearGameCart());
      navigation.navigate("App", { screen: "Home" });
    } else {
      return ToastAndroid.showWithGravityAndOffset(
        "Spend more R$" +
          (30 - totalPrice).toFixed(2) +
          ". Minimum amount of R$30.00",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Feather
        name="x"
        size={32}
        color="#B5C401"
        style={{ position: "absolute", top: 15, right: 20 }}
        onPress={() => {
          navigation.closeDrawer();
        }}
      />
      <View
        style={{
          marginTop: 46,
          display: "flex",
          flexDirection: "row",
          paddingLeft: 20,
          marginBottom: 25,
        }}
      >
        <MaterialCommunityIcons name="cart-outline" size={32} color="#B5C401" />
        <Text
          style={{
            color: "#707070",
            fontSize: 22,
            fontWeight: "bold",
            marginLeft: 12,
          }}
        >
          CART
        </Text>
        <Text
          style={{
            borderRadius: 100,
            backgroundColor: "#f7f7f7",
            marginLeft: 50,
            width: 35,
            height: 35,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            elevation: 2,
            marginTop: -5,
            color: "#707070",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          {totalQtt}
        </Text>
      </View>

      <View style={{ height: 400 }}>
        <ScrollView>
          {cartfromStore.length !== 0 &&
            cartfromStore.map((item) => {
              return <BetInCart key={item.index} game={item} />;
            })}
          {cartfromStore.length === 0 && (
            <View
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="cart-remove"
                  size={30}
                  color="#868686"
                />
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#868686", fontSize: 17 }}>
                  Your cart is empty
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#868686", fontSize: 13 }}>
                  Add something here!
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <View
        style={{ flexDirection: "row", marginHorizontal: 30, marginTop: 10 }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#707070" }}>
          CART
        </Text>
        <Text style={{ color: "#707070", fontSize: 15 }}> TOTAL: </Text>
        <Text
          style={{
            position: "absolute",
            right: 0,
            fontSize: 15,
            fontWeight: "bold",
            color: "#707070",
          }}
        >
          {"R$ " + totalPrice.toFixed(2).replace(".", ",")}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 94,
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "#EBEBEB",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={saveHandler}
      >
        <Text style={{ fontSize: 30, color: "#B5C401", marginRight: 15 }}>
          Save
          <MaterialCommunityIcons
            name="arrow-right"
            size={30}
            color="#B5C401"
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
