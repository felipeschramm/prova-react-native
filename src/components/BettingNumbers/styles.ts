import styled from "styled-components";

interface PropsNumbers {
  colorBtn: string;
}

export const ContainerBettingNumbers = styled.button`
  cursor: pointer;
  width: 59px;
  height: 59px;
  background-color: ${(props: PropsNumbers) => props.colorBtn};
  border-radius: 100px;
  border: none;
  font: normal normal bold 20px Helvetica Neue;
  color: white;
  margin-right: 12px;
  margin-bottom: 20px;
`;
