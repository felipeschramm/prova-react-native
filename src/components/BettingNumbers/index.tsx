import React from "react";
import { ContainerBettingNumbers } from "./styles";

const BettingNumbers: React.FunctionComponent<{
  numberButton: number;
  colorButton: string;
  onClick: () => void;
  isClicked: boolean;
}> = ({ numberButton, colorButton, onClick, isClicked }) => {
  return (
    <ContainerBettingNumbers
      onClick={onClick}
      colorBtn={isClicked ? colorButton : "#ADC0C4"}
    >
      {numberButton<10? '0'+numberButton : numberButton}
    </ContainerBettingNumbers>
  );
};

export default BettingNumbers;