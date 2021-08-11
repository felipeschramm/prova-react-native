import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

export const TextTGL = styled(Text)`
  font-size: 30px;
  color: #707070;
  font-weight: bold;
  margin-left: 4px;
`;

export const ResetText = styled(Text)`
  font-size: 35;
  font-weight: bold;
  color: #707070;
  margin-bottom: 26;
`;

export const ViewForm = styled(View)`
  width: 306;
  height: "auto";
  margin-bottom: 38;
  border-width: 1;
  border-color: #dddddd;
  border-radius: 15;
`;

export const InputText = styled(TextInput)`
  height: 50;
  font-size: 15;
  color: #9D9D9D;
  border-bottom-color: #EBEBEB;
  border-bottom-width: 1;
  padding-left: 26;
  font-weight: bold;
`;
