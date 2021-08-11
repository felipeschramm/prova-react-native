import React from "react";
import { Text } from "react-native";
import { ContainerBettingNumbers } from "./styles";

const BettingNumbers: React.FunctionComponent<{
  numberButton: number;
  colorButton: string;
  onClick: () => void;
  isClicked: boolean;
}> = ({ numberButton, colorButton, onClick, isClicked }) => {
  return (
    <ContainerBettingNumbers
      onPress={onClick}
      colorBtn={isClicked ? colorButton : "#ADC0C4"}
    >
      <Text style={{ fontSize: 20, color: "white" }}>
        {numberButton < 10 ? "0" + numberButton : numberButton}
      </Text>
    </ContainerBettingNumbers>
  );
};

export default BettingNumbers;
