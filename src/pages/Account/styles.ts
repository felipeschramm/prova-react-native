import { Text, TextInput } from "react-native";
import styled from "styled-components/native";

export const Authentication = styled.Text`
  font-size:25px;
  font-weight:bold;
  color: #707070;
`;

export const SendToken = styled(Text)`
  
  position: absolute;
  top: 80;
  right: 50;
  color:  white;
  background-color: #b5c401;
  border-radius: 15px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:10
`;
