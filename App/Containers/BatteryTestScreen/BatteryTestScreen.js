import React, { memo, useState, useEffect } from 'react'
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import DeviceBattery from 'react-native-device-battery';
import { useKeepAwake } from 'expo-keep-awake';

import VideoSource from '../../Videos/battery-test-video.mp4';

import { Container, BenchmarkContainer, ControlsContainer, Button, ButtonText, VideoComponent } from './BatteryTestScreen.styles';

const BATTERY_START_LEVEL = 99;
const BATTERY_END_LEVEL = 9;

export const BatteryTestScreen = memo(({ stop, saveResult, addSample }) => {
  const [isCharging, setIsCharging] = useState(false);
  const [batteryStatus, setBatteryStatus] = useState(0);
  useKeepAwake();

  const getBatteryPercentLevel = value => Math.round(value * 100) ;

  const onBatteryStateChanged = ({ level, charging }) => {
    const batteryLevel = getBatteryPercentLevel(level);
    if (batteryStatus !== batteryLevel) {
      setBatteryStatus(batteryLevel);
    }
    if (charging !== isCharging) {
      setIsCharging(charging);
    }
  };

  const requestBattery = () => {
    DeviceBattery.getBatteryLevel().then(level => {
        setBatteryStatus(getBatteryPercentLevel(level));
      }
    );
    DeviceBattery.isCharging().then(isCharging => {
        setIsCharging(isCharging);
      }
    );
    DeviceBattery.addListener(onBatteryStateChanged);
  };

  useEffect(() => {
    requestBattery();
  }, []);

  useEffect(() => {
    if (batteryStatus === BATTERY_START_LEVEL) {
      addSample(`start, ${BATTERY_START_LEVEL}%`);
    } else if (batteryStatus === BATTERY_END_LEVEL) {
      saveResult();
    } else if (batteryStatus < BATTERY_START_LEVEL && batteryStatus > BATTERY_END_LEVEL) {
      addSample(batteryStatus);
    }
  }, [batteryStatus]);

  const handleStop = () => stop();
  const handleSaveResult = () => saveResult();

  return (
    <Container>
      <BenchmarkContainer>
        <VideoComponent source={VideoSource} muted repeat resizeMode="cover" />
      </BenchmarkContainer>
      <ControlsContainer>
        <Button onPress={handleStop} >
          <ButtonText>
            stop
          </ButtonText>
        </Button>

        <Text>charging: {isCharging ? 'true' : 'false'}</Text>
        <Text>battery: {batteryStatus}%</Text>

        <Button onPress={handleSaveResult} >
          <ButtonText>
            save
          </ButtonText>
        </Button>
      </ControlsContainer>
    </Container>
  );
});

BatteryTestScreen.propTypes = {
  stop: PropTypes.func.isRequired,
  saveResult: PropTypes.func.isRequired,
  addSample: PropTypes.func.isRequired,
};
