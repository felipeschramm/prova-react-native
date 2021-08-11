import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ButtonType from "../../components/ButtonType";
import BettingNumbers from "../../components/BettingNumbers";
import { ScrollView } from "react-native-gesture-handler";
import {
  AddButton,
  BottomButton,
  BottomButtonsRow,
  Container,
  TextButton,
} from "./styles";
import { addGame } from "../../store/Cart/cartSlice";
import moment from "moment";
import { Game } from "../../store/Games/gamesSlice";
import { addGameCart } from "../../store/InfoCart/infoCartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type game = {
  type: string;
  description: string;
  range: number;
  price: number;
  "max-number": number;
  color: string;
  "min-cart-value": number;
};

const NewBetScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [type, setType] = useState("");
  const [game, setGame] = useState<game>({
    type: "",
    description: "",
    range: 0,
    price: 0,
    "max-number": 0,
    color: "",
    "min-cart-value": 0,
  });
  const dispatch = useAppDispatch();
  const [numbersSelected, setNumbersSelected] = useState<number[]>([]);
  const numbersSelect: Array<number> = numbersSelected;
  const [typesGames, setTypesGames] = useState<game[]>();
  const token = useAppSelector((state: RootState) => state.user.token);
  const gamesFromCart: Game[] = useAppSelector((state) => state.cart.bets);
  useEffect(() => {
    axios
      .get("http://192.168.0.100:3333/games", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setTypesGames(resp.data);
      });
  }, [setTypesGames]);

  function defineType(type: string) {
    setType(type);

    typesGames?.forEach((game) => {
      if (game.type === type) {
        setGame(game);
      }
    });
  }

  const clickNumbersHandler = (index: number) => {
    if (
      numbersSelected.length < game["max-number"] &&
      !numbersSelected.includes(index)
    ) {
      const newArray = [...numbersSelected, index];
      setNumbersSelected(newArray);
    } else {
      setNumbersSelected(numbersSelected.filter((number) => number !== index));
    }
  };

  const generateBettingNumbers = () => {
    let arrayNumbers = [];
    for (let index = 1; index <= game.range; index++) {
      arrayNumbers.push(
        <BettingNumbers
          key={index}
          numberButton={index < 10 ? Number("0" + index) : index}
          colorButton={game.color}
          onClick={() => clickNumbersHandler(index)}
          isClicked={numbersSelected.includes(index)}
        />
      );
    }
    return arrayNumbers;
  };

  const clearGame = () => {
    if (numbersSelected.length === 0) {
      return ToastAndroid.showWithGravityAndOffset(
        "Game is already empty",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    setNumbersSelected([]);
  };

  const completeGame = () => {
    if (numbersSelected.length >= game["max-number"]) {
      return ToastAndroid.showWithGravityAndOffset(
        "Game is already completed",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    const left = game["max-number"] - numbersSelected.length;

    for (var i = 1; i <= left; i++) {
      var number = Math.ceil(Math.random() * game.range);
      var resp = number < 10 ? "0" + number : number;
      if (numbersSelected.includes(Number(resp))) {
        --i;
      } else {
        numbersSelect.push(Number(resp));
      }
    }

    setNumbersSelected([...numbersSelect]);
  };

  const formatNumbers = (numbers: Array<number>) => {
    let resp = "";
    numbers.forEach(function (number, index) {
      if (index !== numbers.length - 1) resp += number + ", ";
      else resp += number;
    });
    return resp;
  };

  async function dispatchGame(numbers) {
    try {
      const newBet: Game = {
        index: new Date().toString(),
        numbers: numbers,
        date: moment().format("DD/MM/yyyy"),
        price: Number(game.price.toFixed(2)),
        type: game.type,
        color: game.color,
        "max-number": game["max-number"],
      };
      dispatch(addGame(newBet));
      dispatch(addGameCart(newBet.price));
      setNumbersSelected([]);
    } catch (err) {
      console.log(err)
    }
  }

  function addToCart() {
    const left = game["max-number"] - numbersSelected.length;
    if (numbersSelected.length !== game["max-number"]) {
      if (left === 1) {
        return ToastAndroid.showWithGravityAndOffset(
          "Add 1 more number",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
      return ToastAndroid.showWithGravityAndOffset(
        "Add " + left + " more numbers",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } else {
      const formattedNumbers = formatNumbers(
        numbersSelected.sort((a, b) => a - b)
      );

      dispatchGame(formattedNumbers);
    }
  }

  return (
    <Container>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text
            style={{
              fontSize: 30,
              color: "#707070",
              fontWeight: "bold",
              marginLeft: 4,
            }}
          >
            TGL
          </Text>
          <View
            style={{
              width: 75,
              height: 6,
              backgroundColor: "#B5C401",
              borderRadius: 6,
              marginBottom: 40,
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          {(numbersSelect.length !== 0 || gamesFromCart.length !== 0) && (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
              style={{ marginRight: 20, marginTop: 4 }}
            >
              <MaterialCommunityIcons
                name="cart-outline"
                size={32}
                color="#B5C401"
              />
            </TouchableOpacity>
          )}

          <Entypo
            name="log-out"
            size={30}
            color="#C1C1C1"
            style={{ marginTop: 4 }}
            onPress={() => {
              navigation.replace("Auth");
            }}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 22,
          color: "#707070",
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        NEW BET
        {type && <Text>{" FOR " + type.toUpperCase()}</Text>}
      </Text>
      <Text style={{ fontSize: 17, color: "#868686", marginBottom: 20 }}>
        Choose a game
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 15, width: "100%" }}>
        {typesGames?.map((game, index) => {
          return (
            <ButtonType
              key={index}
              game={game}
              isClicked={type === game.type ? true : false}
              onClick={() => {
                if (type !== game.type) {
                  defineType(game.type);
                  setNumbersSelected([]);
                } else {
                  setType("");
                }
              }}
            />
          );
        })}
      </View>
      {type.length !== 0 && (
        <ScrollView>
          {numbersSelected.length === 0 && (
            <View>
              <Text
                style={{ color: "#868686", fontSize: 17, fontWeight: "bold" }}
              >
                Fill your bet
              </Text>

              <Text
                style={{
                  fontSize: 17,
                  color: "#868686",
                  marginBottom: 10,
                }}
              >
                {game.description}
              </Text>
            </View>
          )}
          {numbersSelected.length !== 0 && (
            <View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {numbersSelected.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: game.color,
                      marginRight: 5,
                      marginBottom: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        clickNumbersHandler(item);
                      }}
                      style={{ position: "absolute", top: 4, right: 8 }}
                    >
                      <Text style={{ fontSize: 10, color: "white" }}>x</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "white" }}>{item}</Text>
                  </View>
                ))}
              </View>
              <BottomButtonsRow>
                <BottomButton onPress={completeGame}>
                  <TextButton>Complete game</TextButton>
                </BottomButton>
                <BottomButton onPress={clearGame}>
                  <TextButton>Clear game</TextButton>
                </BottomButton>
                <View>
                  <AddButton onPress={addToCart}>
                    <Text style={{ color: "white", marginRight: 5 }}>
                      Add to cart
                    </Text>
                  </AddButton>
                  <MaterialCommunityIcons
                    name="cart-outline"
                    size={25}
                    color="white"
                    style={{ position: "absolute", top: 3, left: 5 }}
                  />
                </View>
              </BottomButtonsRow>
            </View>
          )}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {generateBettingNumbers()}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default NewBetScreen;
