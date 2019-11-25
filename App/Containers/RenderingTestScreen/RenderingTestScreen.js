import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import KeepAwake from 'react-native-keep-awake';
import { Text, Button as ButtonOriginal } from 'react-native';

import RenderingImage from '../../Images/rendering-test-image.jpeg';
import {
  Container,
  BenchmarkContainer,
  Button,
  ButtonText,
  ControlsContainer,
  Row,
  RowText,
  RowLink,
  RowImage,
  RowInput
} from './RenderingTestScreen.styles';

const ELEMENTS_MAX_NUMBER = 10000;
const ELEMENTS_STEP_NUMBER = 500;
const ELEMENTS_ROW_NUMBER = 5;

export const RenderingTestScreen = ({ stop, saveResult, addSample }) => {
  const [elementsAmount, setElementsAmount] = useState(0);
  const scrollContainer = useRef(null);
  let interval = null;

  const handlePress = (e) => {
    e.preventDefault();
  };

  const handleStop = () => stop();
  const handleSaveResult = () => saveResult();

  const renderRow = number => {
    return (
      <Row key={number}>
        <RowText>{number + 1}</RowText>
        <RowLink>Link</RowLink>
        <ButtonOriginal title="Button" />
        <RowImage source={RenderingImage} />
        <RowInput value="Input" onPress={handlePress} />
      </Row>
    );
  };

  const handleSizeChange = (width, height) => {
    scrollContainer.current.scrollTo({x: 0, y: height, animated: false });
  };

  useEffect(() => {
    KeepAwake.activate();
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

    const multipliedElements = elementsAmount * ELEMENTS_ROW_NUMBER;

    if (multipliedElements === 5) {
      addSample('first 5 elements');

    }

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
      <BenchmarkContainer ref={scrollContainer} onContentSizeChange={handleSizeChange}>
        {renderRows(elementsAmount)}
      </BenchmarkContainer>
      <ControlsContainer>
        <Button onPress={handleStop} >
          <ButtonText>
            stop
          </ButtonText>
        </Button>

        <Text>{elementsAmount * ELEMENTS_ROW_NUMBER}</Text>

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
