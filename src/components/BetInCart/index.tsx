import React from "react";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeGame } from "../../store/Cart/cartSlice";
import { removeGameCart } from "../../store/InfoCart/infoCartSlice";
import { Game } from "../../store/Games/gamesSlice";
import {
  Container,
  LineColor,
  NumbersTextStyle,
  TypeTextStyle,
  PriceText,
} from "./styles";
import { TouchableOpacity, View } from "react-native";
import moment from "moment";

const BetInCart: React.FC<{
  game: Game;
}> = (props) => {
  const { game } = props;
  const dispatch = useDispatch();

  return (
    <Container>
      <LineColor max={game["max-number"]} color={game.color} />
      <View
        style={{
          width: "196px",
          marginLeft: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NumbersTextStyle>{game.numbers}</NumbersTextStyle>
        <View style={{display:'flex', flexDirection:'row', marginTop:7}}>
          <PriceText>
            {moment().format("DD/MM/YYYY") +
              " - (R$ " +
              game.price.toFixed(2).replace(".", ",") +
              ")"}
          </PriceText>
          <TouchableOpacity style={{ marginLeft: "30px" }}>
            <Feather
              name="trash-2"
              size={15}
              color={"#707070"}
              onClick={() => {
                dispatch(removeGame(game.index));
                dispatch(removeGameCart(game.price));
              }}
            />
          </TouchableOpacity>
        </View>
        <TypeTextStyle color={game.color}>{game.type}</TypeTextStyle>
      </View>
    </Container>
  );
};

export default BetInCart;
