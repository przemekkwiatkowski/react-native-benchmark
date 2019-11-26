import React, { useState, useEffect, useRef } from 'react'
import { PermissionsAndroid } from 'react-native'
import PropTypes from 'prop-types'
import { Text } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";

import {
  Container,
  BenchmarkContainer,
  Button,
  ButtonText,
  ControlsContainer,
  Clicker,
  ClickerText,
  Cords,
  ConnectionStatus,
} from './GeolocationTestScreen.styles';

export const GeolocationTestScreen = ({ stop, saveResult, addSample }) => {
  const clickerRef = useRef(null);
  const cordsRef = useRef(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [time, setTime] = useState(0);
  const [disabled, isDisabled] = useState(false);
  const [numberOfSuccessGets, setNumberOfSuccessGets] = useState(0);
  const [allGets, setAllGets] = useState(0);
  const connectionStatus = useNetInfo();
  const { isConnected } = connectionStatus;
  let startTime = 0;
  let endTime = 0;
  let id = null;

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    distanceFilter: 0,
  };

  const success = position => {
    const coords = position.coords;
    const { latitude, longitude, accuracy } = coords;
    endTime = Date.now();
    const timeConsumed = (endTime - startTime) / 1000;
    setTime(timeConsumed);
    setLatitude(latitude);
    setLongitude(longitude);
    setAccuracy(accuracy);
    isDisabled(false);
    addSample(`time: ${timeConsumed} accuracy: ${accuracy} online: ${isConnected}`);
    setNumberOfSuccessGets(numberOfSuccessGets => numberOfSuccessGets + 1);
    navigator.geolocation.clearWatch(id);
  };

  const error = error => {
    alert(error);
  };

  async function requestLocationPermission() {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Permission',
          'message': 'This App needs access to your location ' +
            'so we can know where you are.'
        }
      )
    } catch (err) {
      alert(err);
    }
  }

  const getPosition = () => (id = navigator.geolocation.watchPosition(success, error, options));

  const handleOnClick = () => {
    isDisabled(true);
    requestLocationPermission()
      .then(resp => {
          startTime = Date.now();
          setAllGets(allGets => allGets + 1);
          getPosition();
        }
      );
  };

  const handleStop = () => stop();
  const handleSaveResult = () => saveResult();

  return (
    <Container>
      <BenchmarkContainer>

        <Clicker ref={clickerRef} onPress={handleOnClick} disabled={disabled}>
          <ClickerText>Get position</ClickerText>
        </Clicker>
        <Cords ref={cordsRef} disabled={disabled}>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
          <Text>Accuracy: {accuracy}</Text>
          <Text>Time: {time}</Text>
        </Cords>
        <ConnectionStatus connection={isConnected}>{isConnected ? 'online' : 'offline'}</ConnectionStatus>

      </BenchmarkContainer>
      <ControlsContainer>
        <Button onPress={handleStop} >
          <ButtonText>
            stop
          </ButtonText>
        </Button>

        <Text>{allGets}</Text>
        <Text>{numberOfSuccessGets}</Text>

        <Button onPress={handleSaveResult} >
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
