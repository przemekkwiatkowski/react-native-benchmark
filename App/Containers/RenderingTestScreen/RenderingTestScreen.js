import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useKeepAwake } from 'expo-keep-awake';
import { Text } from 'react-native';

import {
  Container,
  BenchmarkContainer,
  Button,
  ButtonText,
  ControlsContainer,
  Row
} from './RenderingTestScreen.styles';

export const RenderingTestScreen = ({ stop, saveResult, addSample }) => {
  const [elementsAmount, setElementsAmount] = useState(0);
  const scrollContainer = useRef(null);
  let interval = null;
  useKeepAwake();

  const handleStop = () => stop();
  const handleSaveResult = () => saveResult();

  const renderRow = number => {
    return (
      <Row key={number}>
        <Text>abc</Text>
        <Text>cde</Text>
        <Text>efg</Text>
      </Row>
    );
  };

  useEffect(() => {
    console.log('start');
    interval = setInterval(() => {
      setElementsAmount(elementsAmount => elementsAmount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (elementsAmount === 0) {
      addSample('start');
    }

    if (scrollContainer) {
      console.log(scrollContainer);
    }

    const multipliedElements = elementsAmount * ELEMENTS_ROW_NUMBER;

    if (multipliedElements && multipliedElements % ELEMENTS_STEP_NUMBER === 0) {
      addSample(String(multipliedElements));
    }

    if (multipliedElements === ELEMENTS_MAX_NUMBER) {
      saveResult();
    }
  }, [elementsAmount]);

  const renderRows = number => [...Array(number)].map((e, i) => renderRow(i));

  return (
    <Container>
      <BenchmarkContainer ref={scrollContainer}>{renderRows(elementsAmount)}</BenchmarkContainer>
      <ControlsContainer>
        <Button onPress={handleStop} >
          <ButtonText>
            stop
          </ButtonText>
        </Button>

        <Button onPress={handleSaveResult} >
          <ButtonText>
            save
          </ButtonText>
        </Button>
      </ControlsContainer>
    </Container>
  );
};

RenderingTestScreen.propTypes = {
  stop: PropTypes.func.isRequired,
  saveResult: PropTypes.func.isRequired,
  addSample: PropTypes.func.isRequired,
};
