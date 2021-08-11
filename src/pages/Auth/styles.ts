import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

export const TextTGL = styled(Text)`
  color: #707070;
  font-size: 44px;
  font-weight: bold;
  margin-left: 8px;
`;

export const LineColor = styled(View)`
  width: 107px;
  height: 7px;
  background-color: #b5c401;
  border-radius: 6px;
  margin-bottom: 46px;
`;

export const ViewForm = styled(View)`
  width: 306px;
  height: 293px;
  margin-bottom: 38px;
  border-width: 1px;
  border-color: #dddddd;
  border-radius: 15px;
`;

export const InputText = styled(TextInput)`
  height: 70px;
  font-size: 15px;
  color: #9d9d9d;
  border-bottom-color: #ebebeb;
  border-bottom-width: 1px;
  padding-left: 26px;
  font-weight: bold;
`;

export const ContainerInfo = styled(View)`
  width: 100%;
  align-items: center;
  margin-top: 100px;
`;

export const GreyTitle = styled(Text)`
  color: #707070;
  font-size: 35px;
  font-weight: bold;
`;
