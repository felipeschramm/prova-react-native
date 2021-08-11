import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import axios from "axios";
import { RootState } from "../../store";
import ButtonType from "../../components/ButtonType";
import {ViewIconDollar } from "./styles";
import BetsListItem from "../../components/BetsListItem";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import Header from "../../components/Header";
import { Game } from "../../store/Games/gamesSlice";

type game = {
  index: string;
  numbers: string;
  date: string;
  price: number;
  type: string;
  "max-number": number;
  color: string;
};

const HomePage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [type, setType] = useState("");
  const [typesGames, setTypesGames] = useState<game[]>();
  const gamesFromCart:Array<Game> = useSelector((state: RootState) => state.cart.bets);
  const [allGames, setAllGames] = useState(gamesFromCart);
  const [filteredGames, setFilteredGames] = useState(gamesFromCart);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getTypes = () => {
      axios
        .get("http://192.168.0.100:3333/games", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          setTypesGames(resp.data);
        });
    };

    const getGames = () => {
      setLoading(true);
      setAllGames(gamesFromCart);
      setLoading(false);
    };

    getTypes();
    getGames();
  }, [isFocused]);

  function clickButtonHandler(type: string) {
    setType(type);
    const filtGames = allGames?.filter((game) => game.type === type);
    setFilteredGames(filtGames);
  }

  const renderBets = () => {
    return (
      <ScrollView>
        {type.length !== 0 &&
          filteredGames.length !== 0 &&
          filteredGames.map((game) => (
            <BetsListItem game={game} key={game.index} />
          ))}
        {allGames.length === 0 && (
          <View
            style={{ marginTop: 15, display: "flex", flexDirection: "row" }}
          >
            <Feather name="x-circle" size={20} color="#FF9494" />
            <Text
              style={{ color: "#FF9494", fontSize: 15, fontWeight: "bold" }}
            >
              No bet found. Click on
            </Text>
            <ViewIconDollar>
              <Ionicons name={"logo-usd"} size={15} color={"#fff"} />
            </ViewIconDollar>
            <Text
              style={{ color: "#FF9494", fontSize: 15, fontWeight: "bold" }}
            >
              to add a new one!
            </Text>
          </View>
        )}
        {type.length === 0 &&
          allGames.length !== 0 &&
          allGames.map((game) => {
            return <BetsListItem game={game} key={game.index} />;
          })}
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 25 }}>
      <Header navigation={navigation} />
      <View>
        <Text
          style={{
            fontSize: 22,
            color: "#707070",
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          RECENT GAMES
        </Text>
        <Text style={{ fontSize: 17, color: "#868686", marginBottom: 15 }}>
          Filters
        </Text>
        <View style={{ flexDirection: "row" }}>
          {typesGames?.map((game, index) => {
            return (
              <ButtonType
                key={index}
                game={game}
                isClicked={type === game.type ? true : false}
                onClick={() => {
                  if (type !== game.type) {
                    clickButtonHandler(game.type);
                  } else {
                    setType("");
                  }
                }}
              />
            );
          })}
        </View>
      </View>

      {renderBets()}
    </View>
  );
};

export default HomePage;
