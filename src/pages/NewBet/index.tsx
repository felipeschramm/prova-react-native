import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ButtonType from "../../components/ButtonType";
import BettingNumbers from "../../components/BettingNumbers";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { AddButton, BottomButton, BottomButtonsRow } from "./styles";
import { addGame } from "../../store/Cart/cartSlice";
import moment from "moment";
import { addGameCart} from "../../store/InfoCart/infoCartSlice";

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
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [numbersSelected, setNumbersSelected] = useState<number[]>([]);
  const numbersSelect: Array<number> = numbersSelected;
  const [typesGames, setTypesGames] = useState<game[]>();
  const token = useSelector((state: RootState) => state.user.token);
  const gamesFromCart = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    axios
      .get("http://localhost:3333/games", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setTypesGames(resp.data);
      });
  }, []);

  const dispatch = useDispatch();

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
      // return toast.info("Game is already empty");
    }
    setNumbersSelected([]);
  };

  const completeGame = () => {
    if (numbersSelected.length >= game["max-number"]) {
      // return toast.info("Game is already completed");
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

  const addToCart = async() => {
    const left = game["max-number"] - numbersSelected.length;
    if (numbersSelected.length !== game["max-number"]) {
      if (left === 1) {
        return;
        //toast.info("Select " + left + " more number");
      }
      return;
      //toast.info("Select " + left + " more numbers");
    } else {
      const formattedNumbers = formatNumbers(
        numbersSelected.sort((a, b) => a - b)
      );
      await dispatch(
        addGame({
          index: new Date().toString(),
          numbers: formattedNumbers,
          date: moment().format("DD/MM/yyyy"),
          price: Number(game.price.toFixed(2)),
          type: game.type,
          color: game.color,
          "max-number": game["max-number"],
        })
      );
      await dispatch(addGameCart(game.price))
      // setTotalQty((prevState) => prevState + 1);
      // setTotalPrice((prevState) => prevState + game.price);
      setNumbersSelected([]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 25 }}>
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
          {(numbersSelect.length !== 0|| gamesFromCart.length!== 0) && (
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
        {type && <span>{" FOR " + type.toUpperCase()}</span>}
      </Text>
      <Text style={{ fontSize: 17, color: "#868686", marginBottom: 20 }}>
        Choose a game
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
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
      {type && (
        <ScrollView style={{ width: "100%" }}>
          {numbersSelected.length === 0 && (
            <>
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
                {game?.description}
              </Text>
            </>
          )}
          {numbersSelected.length !== 0 && (
            <>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {numbersSelected.map((item) => (
                  <View
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
                      <Text style={{ fontSize: 10 }}>x</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "white" }}>{item}</Text>
                  </View>
                ))}
              </View>
              <BottomButtonsRow>
                <BottomButton onClick={completeGame}>
                  Complete game
                </BottomButton>
                <BottomButton onClick={clearGame}>Clear game</BottomButton>
                <AddButton onClick={addToCart}>
                  <MaterialCommunityIcons
                    name="cart-outline"
                    size={25}
                    style={{ marginRight: "10px" }}
                  />{" "}
                  Add to cart
                </AddButton>
              </BottomButtonsRow>
            </>
          )}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {generateBettingNumbers()}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default NewBetScreen;
