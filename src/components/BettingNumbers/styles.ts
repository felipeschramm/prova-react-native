import styled from "styled-components/native";

interface PropsNumbers {
  colorBtn: string;
}

export const ContainerBettingNumbers = styled.TouchableOpacity`
  width: 59px;
  height: 59px;
  background-color: ${(props: PropsNumbers) => props.colorBtn};
  border-radius: 100px;
  border: none;
  margin-right: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
