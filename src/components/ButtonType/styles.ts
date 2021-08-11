import styled from "styled-components/native";

interface PropsButton {
  bgColor: string;
  bdColor: string;
}

interface PropsSpan {
  colorText: string;
}

export const ContainerButtonType = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  border-radius: 100px;
  background-color: ${(props: PropsButton) => props.bgColor};
  border-color: ${(props: PropsButton) => props.bdColor};
  border-width: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
`;

export const Span = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props: PropsSpan) => props.colorText};
`;
