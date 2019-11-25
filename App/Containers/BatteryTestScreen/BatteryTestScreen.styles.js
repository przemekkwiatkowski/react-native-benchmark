import styled from 'styled-components/native';
import Video from 'react-native-video';

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
  flex-flow: column;
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

export const VideoComponent = styled(Video)`
  width: 100%;
  padding-bottom: 56.25%;
`;
