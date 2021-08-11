import styled from "styled-components/native";

export const BottomButton = styled.TouchableOpacity`
  width: auto;
  height: 32px;
  border-width: 1px;
  border-color: #b5c401;
  border-radius: 4px;
  background-color: #f7f7f7;
  margin-right: 15px;
  color: #b5c401;
  font-size:16px;
  padding-left:5px;
  padding-right:5px;
  display:flex;
  justify-content:center;
`;

export const BottomButtonsRow = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const AddButton = styled.TouchableOpacity`
  width: 120px;
  height: 32px;
  background-color: #b5c401;
  border-width: 1px;
  border-color: #b5c401;
  border-radius: 4px;
  display:flex;
  justify-content:center;
  align-items: flex-end;
`;

export const Container = styled.View`
  flex: 1;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 20px;
  margin-top: 25px;
`;

export const TextButton = styled.Text`
font-size:13px;
color:#b5c401;
font-weight: bold;
`