import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useEffect } from "react";
import axios from "axios";
import { RootState } from "../../store";
import ButtonType from "../../components/ButtonType";
import { ContainerErrorData, DivBets, DivErrorText, DivPages } from "./styles";
import BetsListItem from "../../components/BetsListItem";
import { Feather } from "@expo/vector-icons";

type game = {
  index: string;
  numbers: string;
  date: string;
  price: number;
  type: string;
  "max-number": number;
  color: string;
};

type info = { lastPage: number; total: string };

const HomePage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [type, setType] = useState("");
  const [typesGames, setTypesGames] = useState<game[]>();
  const [allgamesFromRequest, setAllGamesFromRequest] = useState<game[]>([]);
  const [gamesFromRequest, setGamesFromRequest] = useState<game[]>([]);
  const [filteredGames, setFilteredGames] = useState(gamesFromRequest);
  const [infoPages, setInfoPages] = useState<info>({ lastPage: 1, total: "" });
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

  useEffect(() => {
    axios
      .get(`http://localhost:3333/bets?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp.data.data);
        setGamesFromRequest(resp.data.data);
        setInfoPages({
          lastPage: resp.data.lastPage,
          total: resp.data.total,
        });
      })
      .catch((err) => {
        // return toast.error("Failed to load bets");
      });

    axios
      .get(`http://localhost:3333/allbets?`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setAllGamesFromRequest(resp.data);
      })
      .catch((err) => {
        // return toast.error("Failed to load bets");
      });
  }, []);

  function clickButtonHandler(type: string) {
    setType(type);
    const filtGames = allgamesFromRequest?.filter((game) => game.type === type);
    setFilteredGames(filtGames);
  }

  const changePage = (page: number) => {
    axios
      .get(`http://localhost:3333/bets?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        if (type) {
          setGamesFromRequest(allgamesFromRequest);
        }
        setGamesFromRequest(resp.data.data);
      })
      .catch((err) => {
        // return toast.error("Failed to load bets");
      });
  };

  const generatePagesNumber = () => {
    let resp = [];
    for (let i = 1; i <= infoPages.lastPage; i++) {
      resp.push(
        <button
          onClick={() => {
            changePage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return resp;
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
        <Entypo
          name="log-out"
          size={30}
          color="#C1C1C1"
          style={{ marginTop: 4 }}
        />
      </View>
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

      <DivBets>
        {type &&
          filteredGames?.length !== 0 &&
          filteredGames?.map((game) => (
            <BetsListItem game={game} key={game.index} />
          ))}
        {!type && gamesFromRequest?.length === 0 && (
          <ContainerErrorData>
            <DivErrorText>
              <Feather name="x-circle" size={20} color="#FF9494" />
              No bet found. Click on{" "}
              <span style={{ color: "#b5c401" }}>New Bet</span> to add a new
              one!
            </DivErrorText>
          </ContainerErrorData>
        )}
        {type && filteredGames?.length === 0 && (
          <ContainerErrorData>
            <DivErrorText>
              <Feather name="x-circle" size={20} color="#FF9494" />
              {"No bet of type " + type + " found"}
            </DivErrorText>
          </ContainerErrorData>
        )}
        {!type &&
          gamesFromRequest?.length !== 0 &&
          gamesFromRequest?.map((game) => {
            return <BetsListItem game={game} key={game.index} />;
          })}
      </DivBets>
      {!type && <DivPages>{generatePagesNumber()}</DivPages>}
    </View>
  );
};

export default HomePage;
