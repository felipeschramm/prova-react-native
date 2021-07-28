import React from "react";
import {ContainerButtonType, Span} from './styles'

interface PropsButtonType {
  game: {
    type: string;
    color: string;
  };
  isClicked: boolean;
  onClick: () => void;
}

const ButtonType: React.FC<PropsButtonType> = (props) => {
  const { game, isClicked, onClick } = props;

  return (
    <ContainerButtonType
      onClick={onClick}
      bgColor={isClicked? game.color:'white'}
      bdColor={game.color}
    >
      <Span
          colorText= {isClicked ? "white" : game.color}
      >
        {game.type}
      </Span>
    </ContainerButtonType>
  );
};

export default ButtonType;