import styled from "styled-components";

interface Props {
  color: string;
}

export const Container = styled.div`
  width: 100%;
  height: auto;
  padding-right: 10%;
  padding-top: 20px;
  display: flex;
  flexdirection: row;
`;
export const LineColor = styled.div`
  width: 6px;
  height: 94px;
  background-color: ${(props: Props) => props.color};
  border-radius: 100px;
`;
export const DivInfo = styled.div`
  margin-left: 15px;
`;
export const InfoBet = styled.div`
  font: normal normal normal 17px Helvetica Neue;
  color: #868686;
  margin-bottom: 11px;
`;

export const NameBet = styled.div`
  font: italic normal bold 20px Helvetica Neue;
  color: ${(props: Props) => props.color};
`;

export const NumbersBet = styled.div`
  font: italic normal bold 20px Helvetica Neue;
  color: #868686;
  margin-bottom: 15px;
`;
