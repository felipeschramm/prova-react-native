import styled from "styled-components/native";

interface Props {
  color: string;
  max: number;
}

interface PropsType {
  color: string;
}

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 284px;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
`;

export const LineColor = styled.View`
  width: 4px;
  height: ${(props: Props) => (props.max > 8 ? "86px" : "60px")};
  background-color: ${(props: Props) => props.color};
  border-radius: 100px
  margin-right: 5px;
  margin-left: 5px;
`;

export const NumbersTextStyle = styled.Text`
  font: italic normal bold 12px Helvetica Neue;
  color: #868686;
  font-weight: bold
`;

export const TypeTextStyle = styled.Text`
  width: 100%;
  font: italic normal bold 16px Helvetica Neue;
  color: ${(props: PropsType) => props.color};
`;

export const PriceText = styled.Text`
  font: normal normal normal 12px Helvetica Neue;
  color: #868686;
  margin-bottom: 7px;
`;
