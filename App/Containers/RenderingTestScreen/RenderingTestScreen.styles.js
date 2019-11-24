import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BenchmarkContainer = styled.ScrollView`
  width: 100%;
  height: 85%;
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
  padding: 5px 15px;
`;

export const Row = styled.View`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-between;
  align-items: center;

  * {
    height: 100%;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid ghostwhite;
    padding: 0;
    margin: 0;
  }
`;
