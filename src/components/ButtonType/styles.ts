import styled from "styled-components";

interface PropsButton {
  bgColor: string;
  bdColor: string;
}

interface PropsSpan{
    colorText:string
}


export const ContainerButtonType = styled.div`
  width: 100px;
  height: 30px;
  border-radius: 100px;
  cursor: pointer;
  background-color: ${(props: PropsButton) => props.bgColor};
  border: ${(props: PropsButton) => "3px solid" + props.bdColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
`;

export const Span = styled.span`
  font: italic normal bold 14px Helvetica Neue;
  color:${(props:PropsSpan)=> props.colorText}
`;
