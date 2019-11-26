import styled from 'styled-components/native';
import { View } from 'react-native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BenchmarkContainer = styled.View`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ControlsContainer = styled.View`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid grey;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 20px;
  background-color: #50bbe2;
`;

export const ButtonText = styled.Text`
  color: white;
  text-align: center;
  text-transform: uppercase;
  padding: 10px 18px;
`;

export const Clicker = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 120px;
  height: 120px;
  width: 120px;
  background-color: #ff726f;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

export const ClickerText = styled.Text`
  color: white;
  text-transform: uppercase;
`;

export const Cords = styled.View`
  display: flex;
  flex-flow: column nowrap;
  margin: 20px auto;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

export const ConnectionStatus = styled.Text`
  color: ${({ connection }) => connection ? 'darkgreen' : 'darkred'};
`;
