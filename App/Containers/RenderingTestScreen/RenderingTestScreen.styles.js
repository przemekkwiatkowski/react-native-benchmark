import styled, { css } from 'styled-components/native';

const RowElementStyles = css`
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #F8F8FF;
  text-align: center;
  line-height: 80px;
`;

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
  padding: 10px 18px;
`;

export const Row = styled.View`
  display: flex;
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RowText = styled.Text`
  ${RowElementStyles};
`;

export const RowLink = styled.Text`
  ${RowElementStyles};
  text-decoration: underline;
  color: blue;
`;

export const RowImage = styled.Image`
  width: 20%;
  height: 100%;
`;

export const RowInput = styled.TextInput`
  ${RowElementStyles};
`;
