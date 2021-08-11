import { Text } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";

interface Props {
  color: string;
}

export const Container = styled(View)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  margin-top: 10px;
`;
export const LineColor = styled(View)`
  width: 6px;
  height: 100%;
  background-color: ${(props: Props) => props.color};
  border-radius: 100px;
`;
export const DivInfo = styled(View)`
  margin-left: 15px;
`;
export const InfoBet = styled(Text)`
  font-size: 12px;
  color: #868686;
  margin-bottom: 7px;
`;

export const NameBet = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${(props: Props) => props.color};
`;

export const NumbersBet = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: #868686;
  margin-bottom: 7px;
`;
