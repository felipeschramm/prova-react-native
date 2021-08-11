import styled from "styled-components/native";

export const DivBets = styled.ScrollView`
  width: 95%;
  height: 400px;
  margin-top: 5px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const DivErrorText = styled.View`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
`;

export const ViewIconDollar = styled.View`
  margin-left: 5px;
  margin-right: 5px;
  width: 25px;
  height: 25px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  background-color: #b5c300;
`;

export const ErrorText = styled.Text`
  color: #FF9494;
  font-size: 15px;
  font-weight: bold;
`;
