import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  BenchmarkContainer,
  Button,
  ButtonText,
  ControlsContainer
} from './GeolocationTestScreen.styles';

export const GeolocationTestScreen = ({ stop, saveResult, addSample }) => {
  return (
    <Container>
      <BenchmarkContainer>
      </BenchmarkContainer>
      <ControlsContainer>
        <Button onPress={stop} >
          <ButtonText>
            stop
          </ButtonText>
        </Button>

        <Button onPress={saveResult} >
          <ButtonText>
            save
          </ButtonText>
        </Button>
      </ControlsContainer>
    </Container>
  );
};

GeolocationTestScreen.propTypes = {
  stop: PropTypes.func.isRequired,
  saveResult: PropTypes.func.isRequired,
  addSample: PropTypes.func.isRequired,
};
