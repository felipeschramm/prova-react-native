import styled from 'styled-components'

export const DivBets = styled.div`
  width: 60%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 350px;
  margin-left: 10%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const ContainerErrorData = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const DivErrorText = styled.div`
  color: #ff9494;
  font: italic normal bold 17px/30px Helvetica Neue;
`;

export const DivPages = styled.div`
  height: 30px;
  width: 400px;
  margin-left: 10%;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  button:focus{
    border: 3px solid #b5c401;
    background-color: #b5c401;
    color:white;
  }
`;
