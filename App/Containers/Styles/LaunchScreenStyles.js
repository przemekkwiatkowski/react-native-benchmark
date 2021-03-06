import styled from 'styled-components/native';


export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  border-radius: 20px;
  height: 30px;
  margin: 20px 0;
  background-color: #50bbe2;
`;

export const ButtonText = styled.Text`
  color: white;
  text-align: center;
  line-height: 30px;
  text-transform: uppercase;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
